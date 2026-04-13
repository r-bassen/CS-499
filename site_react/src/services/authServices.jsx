// modified from the CS-465 final project
// Defines authentication service functions for API calls to the Express backend server
// import
import axios from 'axios';

// // Express backend server call
const API_URL = 'http://localhost:8080'; 

// // authentication service functions for API calls to the Express backend server
export const authServices = {

    isLoggedIn() {      // check i user is logged in
        return localStorage.getItem("accessToken") !== null; // check if token exists in local storage
    },

    getCurrentUser: () => {     // get curret user
        const userStr = localStorage.getItem('user'); // get user info from local storage
        return userStr ? JSON.parse(userStr) : null; // parse and return user info, or null if not found
    },

    // login function that sends email and password to the backend for authentication
    login: async (email, password) => {
        try {
            // post login credentials 
            const res = await axios.post(`${API_URL}/auth/login`, { 
                email: email,
                password: password 
            }, {
                    headers: {
                        'Content-Type': 'application/json'} // set content type for JSON data
                });

                // log the login response
                console.log("Logged login response:", res.data);
                console.log("Response data keys:", Object.keys(res.data));

                // if login is successful, store token and user data
                if (res.data && res.data.token) {
                    // store the token
                    localStorage.setItem("accessToken", res.data.token);
                    // store the user data 
                    localStorage.setItem('user', JSON.stringify({
                        id: res.data.userId,
                        email: res.data.email
                    }));
                // } {   
                    // // store the token
                    // localStorage.setItem("accessToken", res.token);

                    // // store the user data 
                    // localStorage.setItem('user', JSON.stringify({
                    //     id: res.data.userId || res.data.id,
                    //     email: res.data.email
                    // }));
                console.log("Login successful, token stored");

                } else {    // log warning if no access token is returned
                    console.warn("No token received from login response:", res.data);
                    throw new Error("No token received from server");
                }
                return res.data; // return the response data from the login request

        } catch (loginError) {      // log any errors with the login process
            console.error('Login error:', loginError);
            throw loginError;
        }},

        // logout function that clears the local storage of tokens and user data
        logout: () => {
            localStorage.removeItem("accessToken"); 
            localStorage.removeItem("user"); 
            console.log("Logged out, tokens cleared");
        },

        // authentication header for API requests
        getAuthHeader: () => {
            const token = localStorage.getItem("accessToken"); 
            return token ? { Authorization: `Bearer ${token}` } : {}; 

        }
};