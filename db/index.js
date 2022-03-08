const DB_password = require('../config.js');

const { Pool } = require('pg');
const pool = new Pool({
  host: '18.144.169.107',
  user: 'postgres',
  password: DB_password,
  port: 5432,
  database: 'products'
});

module.exports = pool;

// const { Pool } = require('pg');
// const pool = new Pool({
//   host: 'localhost', // postgres ubuntu instance
//   user: 'teresalew',
//   port: 5432,
//   database: 'products'
// });

// module.exports = pool;

