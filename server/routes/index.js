// Main router file for Express
// Modeled from CS-465 final project
//import * as db from '../config/db.config';

// imports
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const surveyCtrl = require('../controllers/surveyController');
const auth = require('../middleware/authMiddleware');


// // Authentication routes
router.post('/auth/login', authCtrl.login);

// Protected survey routes
router.get('/surveys/:id/questions', auth, surveyCtrl.getSurveyQuestions);
router.post('/surveys/:id/submit', auth, surveyCtrl.submitSurvey);
router.get('/surveys/:id/results', auth, surveyCtrl.getSurveyResults);

// // Health check endpoint
router.get('/health', (req, res) => {
     res.json({ status: 'OK', time: new Date().toISOString() });
 });


// export router
module.exports = router;
