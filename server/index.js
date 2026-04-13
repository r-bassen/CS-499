// Express backend main 
// Reference: https://medium.com/@leebanriley44/how-i-connected-react-frontend-to-node-js-postgresql-backend-5c256c1ffeca
// modeled from https://www.bezkoder.com/react-node-express-mysql/
// and CS-465 final project app.js file
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// import routes
const routes = require('./routes/index');

// create express app
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173', // default port used for Vite
    credentials: true, // Allow cookies to be sent
}));


// Parse JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to main router index.js
app.use('/', routes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


// set Node/Express backend port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});