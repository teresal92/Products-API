const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost', // postgres ubuntu instance
  user: 'teresalew',
  port: 5432,
  database: 'products'
});

module.exports = pool;
