const jwt = require('jsonwebtoken');
const Trip = require('../../app_api/models/travlr');

/* GET homepage. */
const index = (req, res) => {
    console.log('Inside app_server, controllers, main.js, index function.');
   return res.render('index', { title: 'Travlr Getaways' });
};


/* GET travel page. */
const travel = async (req, res) => {
    // Fetch all trips from the database
    const trips = await Trip.find({}).exec();
    let loggedIn = false;

    try {
        // Check for token in cookies
        const token = req.cookies?.token;

        // No token found
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET);
            loggedIn = !!token;
        }

    } catch (err) {
        loggedIn = false;
    }
    // Render travel page with trips and loggedIn status
   return res.render('travel', { trips, title: 'Travlr Getaways', loggedIn });
};


/*GET news page */
const news = (req, res) => {
   return res.render('news', { title: 'Travlr Getaway News' })
};

/*GET login page */
const login = (req, res) => {
    return res.render('login', { title: 'Login' });
};

// Export controller functions
module.exports = {
    index,
    travel,
    news,
    login
};