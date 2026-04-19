// Union updates controller for the NFA-WNC website
// Project code modified from CS-465 Final Project and 
// https://www.bezkoder.com/node-js-jwt-authentication-postgresql/
const fs = require('fs');
const path = require('path');

// get union updates data from JSON file
exports.getUpdates = (req, res) => {
    try {
       const filePath = path.join(__dirname, '../data/updates.json');
       const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
       res.json(data);

    } catch(fileError) {
        console.error("Error reading updates file: ", fileError);
        res.status(500).send({ fileError: 'Error loading updates data'});
    }
}   

