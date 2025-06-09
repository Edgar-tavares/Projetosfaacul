const { Pool } = require('pg');
require('dotenv').config();

// Opção 1: Usando variáveis separadas
const pool = new Pool({
  host: process.env.SUPABASE_DB_HOST,
  port: process.env.SUPABASE_DB_PORT,
  database: process.env.SUPABASE_DB_NAME,
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // Obrigatório para Supabase
  }
});