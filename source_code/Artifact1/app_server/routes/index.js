var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const authCtrl = require('../../app_api/controllers/authentication');
const checkoutCtrl = require('../controllers/checkout');
const reservationCtrl = require('../controllers/reservations');

/* GET home page. */
console.log('Inside app_server, routes, index.js');
router.get('/', ctrlMain.index);

/* GET navigation pages. */
router.get('/travel', ctrlMain.travel);
router.get('/news', ctrlMain.news);
router.get('/login', ctrlMain.login);

// Authentication routes
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

// checkout routes
router.get('/checkout', checkoutCtrl.checkout);
router.post('/checkout', checkoutCtrl.checkoutSubmit);

// Reservations route
router.get('/reservations', reservationCtrl.reservations);

module.exports = router;
