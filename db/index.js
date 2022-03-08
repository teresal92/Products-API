const DB_password = require('../config.js');

const { Pool } = require('pg');
const pool = new Pool({
  host: '54.177.33.177',
  user: 'postgres',
  password: 'sdc2022',
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

