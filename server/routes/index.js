// Main router file for Express
// Modeled from CS-465 final project
//import * as db from '../config/db.config';

// import the controllers and middleware
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const surveyCtrl = require('../controllers/surveyController');
const updatesCtrl = require('../controllers/updatesController');
const auth = require('../middleware/authMiddleware');

// // Authentication routes
router.post('/auth/login', authCtrl.login);

// Routes for survey and updates data
router.get('/surveys/:id/questions', auth, surveyCtrl.getSurveyQuestions);
router.post('/surveys/:id/submit', auth, surveyCtrl.submitSurvey);
router.get('/surveys/:id/results', auth, surveyCtrl.getSurveyResults);
router.get('/updates', updatesCtrl.getUpdates);

// // Health check endpoint
router.get('/health', (req, res) => {
     res.json({ status: 'OK', time: new Date().toISOString() });
 });


// export router
module.exports = router;
