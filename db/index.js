const { Pool } = require('pg');
const pool = new Pool({
  host: '54.241.127.167', // postgres ubuntu instance
  user: 'teresalew',
  port: 5432,
  database: 'products'
});

module.exports = pool;
