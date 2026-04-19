//Survey login page and survey form components
// React component - Survey page
// Project code modified from the CS - 465 template and my final project(2025)
//
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SurveyForm from "../components/surveyForm";
import { getSurveyQuestions, submitSurvey } from "../services/surveyServices";
import { authServices } from "../services/authServices";


// Survey form component
// This page will show different components that adjusts to user login
// User must login before seeing the survey and results
export default function Survey() {
    // declare variables with useState key-value pairs
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [submit, setSubmit] = useState(false);
    const [globalScale, setGlobalScale] = useState(null);
    const navigate = useNavigate();
   
    // login authentication
    const isLoggedIn = authServices.isLoggedIn();
    const surveyId = 1;

    //load survey questions from database
    useEffect(() => {
        async function getQuestions() {
            // check for user login before fetching
            const loggedIn = authServices.isLoggedIn();
            console.log("Is logged in?", loggedIn);
            if (!loggedIn) {
                return;
            }

            // get survey questions from the database using the surveyId
           try {
                const surveyData = await getSurveyQuestions(surveyId);

                // check if survey data is in expected format 
                if (surveyData && surveyData.questions) {
                    setQuestions(surveyData.questions);
                    setGlobalScale(surveyData.scale);

                } else {    // log error if survey questions data is not in expected format
                    console.error("Invalid format for survey questions:", surveyData);
                }

            } catch (fetchError) {     // log any errors with fetching survey questions
                console.error("Error fetching survey questions:", fetchError);
           }
        }
        getQuestions(); // return questions from database    
    
    }, [surveyId]); 


// Handle updates to user survey responses
// Spread operator reference: https://medium.com/@malkamalik007/spread-operator-in-react-905a25a15a7a
const handleResponseChange = (questionId, value, isCheckbox = false) => {

    // Add the new responses to the stored survey responses using a spread operator
    setResponses(prevResponses => {
        // Handle checkbox format for multi-select questions
        if (isCheckbox) {
            const currentResponses = prevResponses[questionId] || [];

            // Uncheck value if it already exists in the array
            if (currentResponses.includes(value)) {
                return { ... prevResponses, [questionId]: currentResponses.filter(item => item !== value) };
            } else {
                return { ...prevResponses, [questionId]: [...currentResponses, value] };
            }
        }
        // return responses for other questions
        return { ...prevResponses, [questionId]: value }

    });
};


// handler for submitting survey results
const handleSubmitSurvey = async (event) => {
    event.preventDefault();

    // check if user is logged in before accessing survey
    if(!isLoggedIn) {   
        navigate("/login");
        return;
    }

    try {   // submit survey responses to the database
        await submitSurvey(surveyId, responses);
        setSubmit(true);

    } catch (submitError) {  // log any errors with submitting survey responses
        console.error("Error submitting survey:", submitError);
    }
};
    
// login button handler
const handleLogin = () => {
    navigate("/login", { state: { from: {pathname:"/survey" } } });
};

// logout button handler
const handleLogout = () => {
    authServices.logout();
    navigate("/login");
};

// if submit, load the survey results
if (submit) {
     return (
         <div className ="survey-container">
                 {/* load submission message if successful */}
                     <div className = "submitted-message">
                         <p>Thank you for submitting the survey!</p>

                         {/* navigate to survey results after submitting survey */}
                        <button onClick={() => navigate("/surveyresults")}
                             className = "view-results-btn">View Results</button>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                            </button>
                     </div>
                     </div>
                 );
             }

            // Main survey view
            return (
                    <div className="survey-container">
                        <div className = "survey-header">
                            <h1>Faculty Survey</h1>
                            {/* Logout button handler */}
                            {isLoggedIn && (
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            )}
                            {/* Check for login before accessing the survey */}
                            {!isLoggedIn && (
                                <div className = "login-prompt">
                                    <p>Please login to access the faculty survey.</p>
                                <button onClick={handleLogin} className="login-redirect-btn">
                                        Login to Access Survey
                                    </button>
                        </div>
                        )}
                    </div>

                {/* Survey form - only show after logging in */}
                    <div className = "survey-section">

                        {Array.isArray(questions) && questions.length > 0 ? (
                            <form onSubmit={handleSubmitSurvey}>

                            {questions.map((q, index) => (
                                <SurveyForm 
                                    key={q.id || index}
                                    question={q}    
                                    onResponseChange={handleResponseChange}
                                    globalScale={globalScale}
                                    />
                            ))}
                            <div className = "submit-section">
                                <button 
                                    type="submit"
                                    className="submit-btn"
                                    disabled={!isLoggedIn} >
                                        {isLoggedIn ? "Submit Survey" : "Login to Access Survey"}
                                    </button>
                            </div>

                            </form>
                        ) : (
                            <p>Loading questions...</p>
                        )}
                    </div>
                </div>
    );
}





