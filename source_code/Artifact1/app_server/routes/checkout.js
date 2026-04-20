var express = require('express');
var router = express.Router();

const Reservation = require('../../app_api/models/reservation');
const Trip = require('../../app_api/models/travlr');
const jwt = require('jsonwebtoken');

// Helper function to get user from JWT token
function getUserFromToken(req) {
    const authHeader = req.headers['authorization'];

    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies?.token;

        // No token found
        if (!token) return null;

        // Verify token and extract user info
        return jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {
        return null;
    }
}

// POST to create a new reservation
router.post('/:code', async (req, res) =>
{
    // Get user from token
    const user = getUserFromToken(req);

    // If user not logged in, redirect to login page
    if (!user) {
        return res.redirect(`/login?redirect=/checkout/${req.params.code}`);
    }

    // Find the trip by code
        const trip = await Trip.findOne({ code: req.params.code }).exec();

    // Trip not found
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }

    // Create new reservation object
    const newReservation = new Reservation({
        userId: user._id,
        code: trip.code,
        name: trip.name,
        numGuests: req.body.numGuests || 1,
    });

    // Save the reservation to the database
    const saved = await newReservation.save();

    // Handle save failure
    if (!saved)
        return res.status(500).json({ message: 'Failed to create reservation' });

        res.redirect(`/confirmation/${saved._id}`);    
});

// GET checkout page for a specific trip
router.get('/:code', async (req, res) =>
{
    // 
    const code = req.params.code;
    const trip = await Trip.findOne({ code: req.params.code }).exec();

    // Trip not found
    if (!trip) {
        return res.status(404)
            .json({ message: 'Trip not found' });
    }

    // Get user from token
    const user = getUserFromToken(req);

    // If user not logged in, redirect to login page
    return res.render('checkout',
        {
            title: 'Checkout',
            trip,
            loggedIn: loggedIn,
            user
        });
});



module.exports = router;