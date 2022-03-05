const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'teresalew',
  port: 5432,
  database: 'products'
});

module.exports = pool;


