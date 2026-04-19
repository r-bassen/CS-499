// Set up connection to PostgreSQL database using the pg library in Node.js.
// Reference: https://node-postgres.com/guides/project-structure
// Modified from the CS-465 Final Project

// create a new PostgreSQL connection pool
const { Pool } = require('pg');

// // load .env file
require('dotenv').config();


// https://node-postgres.com/apis/pool
// 
// call the database login parameters from the .env
const pool = new Pool(
    process.env.DATABASE_URL
    ? { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
    :  {
         host: process.env.DB_HOST || 'localhost',
         user: process.env.DB_USER || 'wnc_nfa',
         password: process.env.DB_PASSWORD,
         database: process.env.DB_DATABASE || 'cs499',
         port: process.env.DB_PORT || 5432,
         max: 100,
         idleTimeoutMillis: 30000,
         connectionTimeoutMillis: 2000
});

// unit testing function to check database connection
pool.connect((error, client, release) => {
    if (error) {
        console.error("Error connecting to database", error.stack);
    } else {
        console.log("successfully connected to database");
        release();
    }
});


// export the pool 
module.exports = pool;