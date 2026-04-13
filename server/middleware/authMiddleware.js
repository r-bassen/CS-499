// test that the JWT token is valid and can be decoded to get the user info
// modified from CS-465 final project 

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware function to check for a valid JWT token in the Authorization header
module.exports = (req, res, next) => {
    console.log("Auth middleware debug");
    console.log("request: req.method, req.url");

    const authHeader = req.header("Authorization");
    console.log("Authorization header present:", !!authHeader);

    if (!authHeader) {
        console.log("No Authorization header");
        return res.status(401).json({error: "login required. No token provided"})
    }

    try {       // check for Authorization token
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {       // return 401 if token is missing or invalid
        res.status(401).json({ error: 'Login Required.' });
    }
};