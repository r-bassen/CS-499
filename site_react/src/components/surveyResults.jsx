// // site_react\src\components\surveyResults.jsx
// 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSurveyResults} from "../services/surveyServices";
import {authServices} from "../services/authServices";
import SurveyForm from "./surveyForm";

//Survey results component that fetches and displays aggregated survey results for a given survey ID
export default function SurveyResults({ surveyId }) {
    // initialize survey results variables
    const safeSurveyId = surveyId || 1;   // use a default survey ID if none provided
    const [graphData, setGraphData] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        authServices.logout();
        navigate("/login");
    }

    useEffect(() => {
        // Get survey results from the server and log the results for debugging
        async function fetchSurveyResults() {
            
            // load graphData function to display survey results
            try {
                const surveyData = await getSurveyResults(safeSurveyId);
                setGraphData(surveyData);

            } catch (fetchError) {     // log any errors with fetching survey results
                console.error("Error fetching survey results:", fetchError);
        }
    }
    fetchSurveyResults();

    }, [safeSurveyId]);


    // if no survey results are found, return no results message
    if (!graphData || Object.keys(graphData).length === 0) {
        return <div>No survey results found.</div>;
    }

    // display the survey results in graph format using the SurveyForm component
    return (
        <div className="results-container">
            <div className="results-header">
                <h2>Survey Results</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            {Object.entries(graphData).map(([questionText, answers]) => {    

                /* display each survey question and aggregated results from surveyForm */ 
                const questionObject = { 
                    questionTitle: questionText,
                    type: "results"
                };

                return (
                    <SurveyForm 
                        key={questionText} 
                        question={questionObject} 
                        results={answers} // show the results for this question
                        globalScale = {null} // not needed for results view
                    />    
                );
            })}
            <p className="results-note">
                Aggregated survey results include your own survey submission.
            </p>
            </div>
    );
}



