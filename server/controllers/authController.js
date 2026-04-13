// Faculty login authentication controller for the NFA-WNC website
// Project code modified from CS-465 Final Project and 
// https://www.bezkoder.com/node-js-jwt-authentication-postgresql/
const userModels = require('../models/userModels');
const jwt = require('jsonwebtoken');

//user login authentication 
//users are already entered and updated by admin in the database
exports.login = async (req, res) => {
    try {
         const {email, password} = req.body;

         // validate email and password input
         if (!email || !password) {
            return res.status(400).sent({
                message: "Email and password are required."
            });
         }

         // check for valid email entry
         const user = await userModels.findUserByEmail(email);

         // return error if user email is not found
         if(!user) {
             return res.status(404).send({
                 message: "User not found."
             });
        }

        // check for valid password entry
        const validPassword = await userModels.validatePassword(password, user.password);
        console.log("password validation result:", validPassword);

        // send error message to user until they enter valid password
        if (!validPassword) {
            return res.status(404).send({
                token: null,
                message: "Invalid password. Please try again."
            });
        }

        // generate JWT token for authenticated user
        const token = jwt.sign({ 
            userId: user.id, 
            email: user.email 
        },
            process.env.JWT_SECRET,
            {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400 // 24 hours
        });

        // send user details and access token in response
        res.status(200).send({
            userId: user.id,
            email: user.email,
            token: token
        });

        // error handling of database retrieval or other
    } catch(err) {
        console.error("Login error: ", err);
        res.status(500).send({ message: err.message });
    }
}   

