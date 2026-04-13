// This file is used to generate a bcrypt hash for database passwords
// Reference: https://www.npmjs.com/package/bcrypt#usage
// Modified from the CS-465 Final Project
// Note: this file is not used in the main application, but can be run separately to generate a hash for a test password to be stored in the database for testing purposes
const bcrypt = require('bcrypt');

// Example stored hash for testing password validation
const storedHash = '$2b$10$u7sXo9n1m8Zl5j3k6vO4uJqz5y8w9e0r1t2v3x4y5z6a7b8c9d0e'; 
//test password
const testPassword = 'testpassword123';

// // Hash it with bcrypt
const isValid = bcrypt.compare(testPassword, storedHash);

// console logs for debugging the password validation process
console.log('Stored:' , storedHash);
console.log('Test password:', testPassword);
console.log('Password valid:', isValid);

// Check if the password is valid and log the result
// if password is invalid, then generate a new hash and log it
if (isValid) {
    console.log('Password is valid!');
} else {
    console.log('Password is invalid!');
    const newHash = bcrypt.hashSync(testPassword, 10);
    console.log('New hash for test password:', newHash);
}


