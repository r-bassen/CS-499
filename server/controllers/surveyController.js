// Main application file for the NFA-WNC website
// Project code modified from https://www.bezkoder.com/react-node-express-mysql/#Create_the_Controller
// Reference: Modified from the CS-465 Final Project

// imports
const surveyModels = require('../models/surveyModels');
const fs = require('fs');
const path = require('path');
const { quicksort, prepareGraphData } = require('./sortingController');


// get the survey questions from the JSON file
function getSurveyQuestions(req, res) {
    try {
        const filePath = path.join(__dirname, '../data/questions.json');
        console.log('Reading survey questions from file:', filePath);

        // error handling for reading JSON file
        if (!fs.existsSync(filePath)) {
            console.error('Survey questions file not found:', filePath);

            return res.status(404).json({ 
                error: 'Survey questions file not found' });
        }

        // read the survey questions from the JSON file and send them in the response
        const surveyData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log('Survey questions data read from file:', surveyData);

        // send survey questions data to the frontend
        res.json(surveyData);

    } catch (jsonError) {       // error handling for reading survey questions from JSON
        console.error('Error reading survey questions file:', jsonError);
        res.status(500).json({ 
            jsonError: 'Error reading survey questions ' + jsonError.message 
        });
    }
}

// submit survey responses to the database
async function submitSurvey(req, res) {
    try {
        // extract user ID, survey ID, and answers from the request body
        const userId = req.user?.userId || 0;
        const surveyId = req.params.id; 
        const { responses } = req.body; 

        // Log the received survey responses for debugging
        console.log("Logging received responses: ", responses);
        console.log("Logging answer types: ", Object.keys(responses));
        console.log("Logging userId: ", userId, "surveyId: ", surveyId);

        const responsesArray = [];

        // Validate that answers is an object
        // Then convert the answers object into an array to store and process the survey responses
        if (responses && typeof responses === 'object' && !Array.isArray(responses)) {
            for (const [questionId, value] of Object.entries(responses)) { 
                if (Array.isArray(value)) {
                    for (const item of value) {
                        responsesArray.push({
                            questionId: parseInt(questionId),
                            value: item,
                            text: null
                    });
                } 
            } else {
                responsesArray.push({
                        questionId: parseInt(questionId),
                        value: value,
                        text: null
                });
            }
        }
    }

        // Validate that responsesArray is not empty and contains valid entries
        if (!responsesArray || responsesArray.length === 0) {
            return res.status(400).json({ error: 'No valid responses provided' });
        }

        // Create a new survey response and get the response ID
        const responseId = await surveyModels.createSurveyResponse(userId, surveyId);

        // Save each answer to the database
        if (!responseId) {
            return res.status(500).json({ 
                error: 'Failed to create survey response' 
            });
        }

        // save each answer 
        for (let i = 0; i < responsesArray.length; i++) {
            const a = responsesArray[i];

            // validate each answer
            if (!a.questionId || a.value === undefined) {
                console.error('Invalid answer format:', a);
                continue; // skip invalid answer
            }

            try {   // save each answer to the database and log the result for debugging
                await surveyModels.saveSurveyResponse(
                    responseId,
                    a.questionId,
                    a.value || null
                );  

            } catch (saveError) {   // error handling for saving each survey answer to the database
                console.error('Error saving survey answer:', saveError);
            }
        }

        res.json({ message: 'Survey submitted successfully' });

    } catch (submitError) {   // error handling for submitting the survey responses
        console.error('Error submitting survey:', submitError);
        res.status(500).json({ 
            submitError: 'Error submitting survey: ' + submitError.message 
        });
    }
}

// get survey responses for a given survey ID
async function getSurveyResults(req, res) {
    try {
        const rows = await surveyModels.getSurveyResults(req.params.id);
        let responses = rows;

        // sort the rows and prepare data for graphing
        // then send the survey results in the response
        if (rows && rows.length > 0) {
            quicksort(rows, "question");
            responses = prepareGraphData(rows);
        }
        // send the prepared survey results 
        res.json(responses);

    } catch (resultError) {       // error handling for fetching survey results from the database
        console.error('Error fetching survey responses:', resultError);
        res.status(500).json({ 
            resultError: 'Error fetching survey results: ' + resultError.message 
        });

    }
}

module.exports = {
    getSurveyQuestions,
    submitSurvey,
    getSurveyResults
}
