const jwt = require('jsonwebtoken');
const Trip = require('../../app_api/models/travlr');

// GET checkout page for a specific trip
const checkout = async (req, res) => {

    // Get trip code from URL parameters
    const code = req.params.code;
    const trip = await Trip.findOne
        ({ code: code }).exec();

    if (!trip) {

        return res.status(404).render('404', { title: 'Trip Not Found' });
    }

    // Check if trip exists
    let loggedIn = false;
    let user = null;

    // Check for token in cookies
    const token = req.cookies?.token || req.query.token;

     // No token found
     if (token) {
            user = jwt.verify(token, process.env.JWT_SECRET);
            loggedIn = true;
     }

    // Render checkout page with trip details and login status
    res.render
        ('checkout',
            {
                trip,
                title: 'Checkout',
                loggedIn: loggedIn,
                user: user,
                token: token
            });
};

// Handle checkout form submission
const checkoutSubmit = async (req, res) => {

    // Get token from cookies
    const code = req.params.code;
    const token = req.cookies?.token || req.body.token || req.query.token;

    // Extract form data
    if (!token) {
        return res.redirect('/login?redirect=/travel/checkout/' + code);
    }
    // Get token from cookies
    const path = '/api/reservations';

    // Extract form data
    const numGuests = parseInt(req.body.numGuests, 10) || 1;
    const postData = {
        code,
        numGuests
    };

    // Get token from cookies
    const requestOptions = {

        // Make API request options
        url: `${process.env.API_URL || 'http://localhost:3000'}${path}`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        json: postData
    };

    // Make API request to create reservation
    request(requestOptions, (error, response, body) => {
        // Handle API response
        if (error) {
            return res.status(500).send('Error processing reservation');
        }

        // Check for unsuccessful response
        return res.status(400).json({
                    message: body.message || 'Reservation failed'
        });

    });
};

module.exports = {
    checkout,
    checkoutSubmit
};

