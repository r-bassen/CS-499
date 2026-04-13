// model functions for survey-related database operations
// Reference: Modified from the CS-465 Final Project

// PostgreSQL queries for survey-related operations
const pool = require('../config/db');

// get all questions for a survey
async function getSurveyQuestions(surveyId) {
    try {
        const countResult = await pool.query(
            `SELECT id, question, question_type, scale
            FROM survey_questions 
            WHERE survey_id = $1`,
            [surveyId]
        );
        return rows;    // return all rows from the query result
    }
    catch (qError) {   // log any errors with fetching survey questions
        console.error('Error fetching survey questions:', qError);
        throw qError; 
}
}

// create a new survey response
async function createSurveyResponse(userId, surveyId) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO survey_responses (user_id, survey_id)
            VALUES ($1, $2)
            RETURNING id`,
            [userId, surveyId]
        );
        return rows[0].id;    // return the id of the submitted survey response

    } catch (err) {     // log any errors with creating a new survey response
        console.error('Error creating survey response:', err);
        throw err;  
}
}

// Save an answer to a survey question by response id, question id, rating 
async function saveSurveyResponse(responseId, questionId, value, text) {
    try {
        if (Array.isArray(value)) {
            for (const item of value) {
                await pool.query(
                    `INSERT INTO survey_answers (response_id, question_id, value)
                    VALUES ($1, $2, $3)`,
                    [responseId, questionId, value]
                );
            }
        } else {
            await pool.query(
                    `INSERT INTO survey_answers (response_id, question_id, value)
                    VALUES ($1, $2, $3)`,
                    [responseId, questionId, value]
            );
        }
    } catch (resError) {     // log any errors with saving a survey answer
        console.error('Error saving survey responses:', resError);
        throw resError;  
}
}

// get aggregated survey results for a given survey ID
async function getSurveyResults(surveyId) {
    try {
        const countResult = await pool.query(
            `SELECT COUNT(*) FROM survey_responses WHERE survey_id = $1`,
            [surveyId]
        );

        // return empty array if no survey responses found for the given survey ID
        if (countResult.rows[0].count === '0') {
            console.log('No survey responses found for survey ID:', surveyId);
            return [];      
         }

        // join survey answers by question then responses
        // group and order by question and answer value
        const { rows } = await pool.query(
            `SELECT q.id AS question_id, q.question, a.value, COUNT(*) as count
            FROM survey_answers a
            JOIN survey_questions q ON a.question_id = q.id
            JOIN survey_responses r ON a.response_id = r.id
            WHERE r.survey_id = $1
            GROUP BY q.id, q.question, a.value
            ORDER BY q.id, a.value`,
            [surveyId]
        );
        console.log('Raw survey results from database:', rows);
        return rows;    // return all rows from the query result

    } catch (resultError) {     // log any errors with fetching survey results
        console.error('Error fetching survey results:', resultError);
        throw resultError;
    }
}

module.exports = {
    getSurveyQuestions,
    createSurveyResponse,
    saveSurveyResponse,
    getSurveyResults
};
