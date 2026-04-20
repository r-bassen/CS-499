const mongoose = require('mongoose');
const Trip = require('../models/travlr');   // register the model
const Model = mongoose.model('trips');


//console.log('Trips controller loaded. Model collection:', Model.collection.name);


// GET: /trips - lists all the trips
const tripList = async (req, res) => {
   // console.log('= TRIP LIST HIT =')

    const q = await Model
        .find({})   // no filter, returns all records
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: 'No trips found' });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:code - lists a single trip
const tripsFindByCode = async (req, res) => {
   // console.log('Finding trip with code:', req.params.tripCode); // Debug log

    const q = await Model
        .findOne({ 'code': req.params.code })  
        .exec();

   // console.log('Found trip:', q); // Debug log

    if (!q) {
        return res
            .status(404)
            .json({ message: 'No trips found' });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        return res
            .status(400)
            .json({ message: 'Failed to add trip' });
    } else {
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
    //console.log('Updating trip with code:', req.params.tripCode); // Debug log
    //console.log('Update data:', req.body); // Debug log

    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.code }, 
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        )
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: 'Trip not found' });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// DELETE: /trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async (req, res) => {
    //console.log('Deleting trip with code:', req.params.tripCode); // Debug log

    const q = await Model
        .findOneAndDelete(
            { 'code': req.params.code }) 
        .exec();

   // console.log('Deleted trip:', q); // Debug log

    if (!q) {
        return res
            .status(404)
            .json({ message: 'Trip not found' });
    } else {
        return res
            .status(200)
            .json({ message: 'Trip deleted successfully', trip: q });
    }
};

module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};