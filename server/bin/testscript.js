// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     user: 'wnc_nfa',
//     host: 'localhost',
//     database: 'cs499',
//     password: 'website4wnc',
//     port: 5432,
// });

// //database connection test function
// pool.connect()
//     .then(client => {
//         console.log(' Successfully connected as wnc_nfa!');
//         client.release();
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error(' Connection failed:', err.message);
//         process.exit(1);
//     });