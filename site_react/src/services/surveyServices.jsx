// Reference: https://www.bezkoder.com/react-node-express-mysql/
// Modified from the CS-465 Final Project
// Defines survey service functions for API calls to the Express backend server
// imports
import axios from 'axios';

// Express backend server call
const API_URL = 'http://localhost:8080'; 

// Get the survey questions from the database
export const getSurveyQuestions = async (surveyId) => {
    const token = localStorage.getItem('accessToken'); // get the token from local storage
    const cleanToken = token?.trim();

    if (!token) {
        console.warn("No access token found.");
        throw new Error("Not authenticated.");
    }

    try {   // Log the received survey answers for debugging
        // Get survey questions from database
        const res = await axios.get(
            `${API_URL}/surveys/${surveyId}/questions`, {
            headers: {
                Authorization: `Bearer ${cleanToken}`, // include the token in the Authorization header
            },
        });
        return res.data;    // return the survey questions data from the response

    } catch (fetchError) {     // log any errors with fetching survey questions
        console.error('Error fetching survey questions:', fetchError);
        throw fetchError;
    }

};

// Submit survey responses to the database
export const submitSurvey = async (surveyId, responses) => {
    const token = localStorage.getItem('accessToken'); // get the token from local storage

    try {   // Log the received survey answers for debugging
        console.log("Submitting survey responses: ", responses);

        // Post survey results to database
        const res = await axios.post(`${API_URL}/surveys/${surveyId}/submit`, 
            { responses }, 
            {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return res.data;
    }

    catch (submitError) {   //  log any errors with submitting survey answers
        console.error('Error submitting survey answers:', submitError);
        throw submitError;
    }
};

// Get aggregated survey results
export const getSurveyResults = async (surveyId) => {
    const token = localStorage.getItem("accessToken"); // get the token from local storage

    try {   // Log the survey ID for debugging
        console.log("fetching survey results for surveyId: ", surveyId);

        // Get survey results from database
        const res = await axios.get(`${API_URL}/surveys/${surveyId}/results`, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data; 
    }

    catch (updateError) {   // log any errors with getting updated survey results
        console.error('Error fetching survey results:', updateError);
        throw updateError;
    }

};

