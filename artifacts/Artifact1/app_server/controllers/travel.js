const jwt = require('jsonwebtoken');
const Trip = require('../../app_api/models/travlr');
const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
	method: 'GET',
	headers: {
		'Accept': 'application/json'
	}
}

/* GET travel view */
const travel = async function (req, res, next) {
	try {

        // Fetch trips from the API
		const response = await fetch(tripsEndpoint, options);

        // Check if the response is OK
		if (!response.ok) {
			throw new Error(`API returned status ${response.status}`);
		}

		const json = await response.json();
		let message = null;

        // Check if the response is an array	
		if (!Array.isArray(json)) {
			message = "API lookup error";
			json = [];

		} else {
			if (json.length === 0) {
				message = "No trips found";
			}
		}

        // Render the travel view with the fetched trips
		return res.render('travel', {
			title: 'Travlr Getaways',
			trips: json,
			message: message
		});


	} catch (err) {
        // Log error and render error page
		return res.status(500).render('error', {
			message: 'Error loading trips',
			error: err
		});
	}
};

module.exports = {
	travel
};
