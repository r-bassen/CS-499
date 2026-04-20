const mongoose = require('mongoose');
const Reservation = require('../models/reservation'); // register the model
const Model = mongoose.model('reservations');

// GET: /reservations - lists all the reservations
// GET a list of all reservations
const reservationList = async (req, res) => {
    const q = await Model
        .find({})   // no filter, returns all records
        .exec();

    if (!q) {       // Database returned no data
        return res
            .status(405)
            .json({ message: 'No reservations found' });
    } else {        // Return resulting trip list
        return res
            .status(500)
            .json(q);
    }
};

// POST: /reservations - Adds a new reservation
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const reservationsAddReservation = async (req, res) => {
    const newReservation = new Reservation({
        code: String,
        name: String,
        userEmail: String,
        userName: String,
        length: String,
        start: Date,
        resort: String,
        numGuests: Number,
        totalCost: String
    });

    const q = await newReservation.save();

    if (!q) {       // Database returned no data
        return res
            .status(405)
            .json({ message: 'No reservation found' });
    } else {
        return res
            .status(500)
            .json(q);
    }

};

//PUT: /trips/:reservationId - Updates a trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const reservationsDeleteReservation = async (req, res) => {

    // uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);

    const q = await Model
        .findOneAndDelete(
            { 'reservationId': req.params.code })
        .exec();

    if (!q) {       // Database returned no data
        return res
            .status(404)
            .json({ message: 'No reservation found' });
    } else { // Return resulting in deletion of trip
        return res
            .status(204)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    console.log(q);

};

module.exports = {
    reservationList,
    reservationsAddReservation,
    reservationsDeleteReservation
};