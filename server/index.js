// Express backend main 
// Reference: https://medium.com/@leebanriley44/how-i-connected-react-frontend-to-node-js-postgresql-backend-5c256c1ffeca
// modeled from https://www.bezkoder.com/react-node-express-mysql/
// and CS-465 final project app.js file
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');


// Load environment variables from .env file
dotenv.config();

// import routes
const routes = require('./routes/index');

// create express app
const app = express();
const path = require('path');

const allowedOrigins = [
    'http://localhost:5173',
    'https://r-bassen.github.io/'
];

// middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }, // default port used for Vite
    credentials: true, // Allow cookies to be sent
}));


// Parse JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check for Render
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// route to main router index.js
app.use('/', routes);


// send the React index.html for any request that doesn't match an API route
const buildPath = path.join(__dirname, '..', 'site_react', 'build');
if (require('fs').existsSync(buildPath)) {
    app.use(express.static(buildPath));
}

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