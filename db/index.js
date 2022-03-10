require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

module.exports = pool;

// const { Pool } = require('pg');
// const pool = new Pool({
//   host: '184.72.6.139',
//   user: 'postgres',
//   password: DB_password,
//   port: 5432,
//   database: 'products'
// });

// module.exports = pool;

// const { Pool } = require('pg');
// const pool = new Pool({
//   host: 'localhost', // postgres ubuntu instance
//   user: 'teresalew',
//   port: 5432,
//   database: 'products'
// });

// module.exports = pool;

