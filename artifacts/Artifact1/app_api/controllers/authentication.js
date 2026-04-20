const User = require('../models/user');
const passport = require('passport'); 

// register function to create a new user
const register = async (req, res) => {
    // validate message to insure that all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    // create new user object
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: ''
        }
    );

    user.setPassword(req.body.password)  // set user password
    const q = await user.save();

    if (!q)
    {
        // database returned no data
        return res
            .status(400)
            .json(err)

    } else {
        // return new user token
        const token = user.generateJWT();
        return res
            .status(200)
            .json(token);
    }
};

const login = (req, res, next) => {

    // Validate request
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    // Assign authentication to passport  
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in Authentication Process 
            return res
                .status(404)
                .json(err);
        }

        if (user) { // Successful authentication
            const token = user.generateJWT();
            console.log('Login successful.');
            return res.status(200).json({ token });

        } else {
            // Auth failed - return error message
            return res.status(401).render('login', {
                message: 'Invalid login.'
            });

        }
    })
};

module.exports = {
    register,
    login
};