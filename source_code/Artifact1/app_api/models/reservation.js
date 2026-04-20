const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
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

const Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;