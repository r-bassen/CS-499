// user model functions for user-related database operations
// Reference: Modified from the CS-465 Final Project

// PostgreSQL queries for survey-related operations
const pool = require('../config/db');
const bcrypt = require('bcrypt');


// get the user by email for login authentication
async function findUserByEmail(email) {
    try {
        const { rows } = await pool.query(
            `SELECT id, email, password
            FROM users
            WHERE email = $1`,
            [email]
        );
        return rows[0]; // return the user by the email query result

        } catch (err) {     // log any errors with fetching user by email
            console.error('Error fetching user by email:', err);
            throw err;
        }
}

// Validate password with bcrypt
async function validatePassword(passwordEntry, hashedPassword) {
     return await bcrypt.compare(passwordEntry, hashedPassword);
}

// find user id using email
async function findUserById(id) {
    try {
        const { rows } = await pool.query(
            `SELECT id, email, password
            FROM users
            WHERE id = $1`,
            [id]
        );
        return rows[0]; // return the id and email of the user with the given id

    } catch (userError) {     // log any errors with fetching user by id
        console.error('Error fetching user by id:', userError);
        throw userError;
    }
}

module.exports = {
    findUserByEmail,
    validatePassword,
    findUserById
}


