var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');


// GET travel page
router.get('/', async (req, res, next) => {
   // console.log('GET / route handler called in travel router');
    try {
        await controller.travel(req, res, next);
       // console.log('Controller returned');
    } catch (err) {
        console.error('ERROR IN ROUTE:', err);
        next(err);
    }
});

module.exports = router;