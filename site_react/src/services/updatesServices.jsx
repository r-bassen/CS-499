// Reference: https://medium.com/@leebanriley44/how-i-connected-react-frontend-to-node-js-postgresql-backend-5c256c1ffeca
// Reference: https://www.bezkoder.com/react-node-express-mysql/
// Modified from the CS-465 Final Project
// Defines user service functions for API calls to the Express backend server
import axios from 'axios';

// Express backend server call
const API_URL = import.meta.env.VITE_API_URL || 'https://wnc-nfa.onrender.com'; 

// Get faculty users from the database
export const getUpdates = async () => {

    try {   // get user data
        const res = await axios.get(`${API_URL}/updates`);
        return res.data;

    } catch (fetchError) {      // log any errors for getting user data
        console.error('Error fetching users:', fetchError);
        throw fetchError;
    }

};