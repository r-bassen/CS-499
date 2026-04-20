const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');    //enanle JSON web tokens

// import controllers that we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const usersController = require('../controllers/users');
const reservationsController = require('../controllers/reservations');



// Method to authenticate our JWT 
function authenticateJWT(req, res, next) {
    // console.log('In Middleware'); 

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader); 

    if (!authHeader) {
        console.log('Auth Header Required but not present!');
        return res.sendStatus(401);
    }

    // split the auth header into tokens
    const parts = authHeader.split(' ')[1];

    // check we have at least 2 tokens
    if (parts.length !== 2 || parts[0] != 'Bearer') {

        // not enough tokens
        console.log('Bad header');
        return res.status(401).json({ error: "Bad Header" });
    }

    const token = parts[1];
    // console.log('Token: ' + token); 

    if (!token) {
        console.log('Null Bearer Token');
        return res.status(401).json({ error: "Token missing" });
    }


    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }

        req.auth = decoded;
        next();
});
}

// define route for register endpoint
router
    .route('/register')
    .post(authController.register);

// define route for login endpoint
router
    .route('/login')
    .post(authController.login);


// define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList)    // GET Method routes tripsList
    .post(authenticateJWT, tripsController.tripsAddTrip) // POST Method adds a trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip); // Added DELETE Method deletes a trip

// GET method routes usersGetProfile - requires authentication
router
    .route('/users')
    .get(authenticateJWT, usersController.userList)
    .post(authenticateJWT, usersController.usersAddUser);

    // GET method finds, deletes and updates users by ID
router
    .route('/users/:userId')
    .get(authenticateJWT, usersController.usersFindById)
    .put(authenticateJWT, usersController.usersUpdateUser)
    .delete(authenticateJWT, usersController.usersDeleteUser);

    // list and add reservations
router
    .route('/reservations')
    .get(authenticateJWT, reservationsController.reservationList)
    .post(authenticateJWT, reservationsController.reservationsAddReservation);

    // delete reservations by ID
router
    .route('/reservations/:reservationId')
    .delete(authenticateJWT, reservationsController.reservationsDeleteReservation);

module.exports = router;