const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis do .env

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool;
