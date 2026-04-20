const jwt = require('jsonwebtoken');
const Reservation = require('../../app_api/models/reservation');

// GET reservations page * /
const reservations = async (req, res) => {
    const token = req.cookies?.token || req.query.token;

    // Check if user is logged in
    if (!token) {
        return res.redirect('/login?redirect=/reservations');
    }

    try {
        // Verify token and get user
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch all reservations for this user
        const userReservations = await Reservation.find({
            userId: user.userId || user._id
        }).exec();

        return res.render('reservations', {
            title: 'My Reservations',
            reservations: userReservations,
            token: token,
            loggedIn: true,
            user: user
        });
    } catch (err) {
        console.error(err);
        return res.redirect('/login?redirect=/reservations');
    }
};

module.exports = {
    reservations  
};