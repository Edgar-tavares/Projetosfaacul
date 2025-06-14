require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); 

const app = express();
const curriculoRoutes = require('./routes/curriculo');

app.use(cors());
app.use(express.json());

app.use('/api/curriculos', curriculoRoutes);

// Rota de health check
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM pessoa');

    res.json({
      status: 'online',
      db: 'conectado e operacional',
      total_pessoas: result.rows[0].count,
      ambiente: process.env.NODE_ENV,
      ssl: process.env.NODE_ENV === 'production' ? 'ativo' : 'desativado'
    });
  } catch (err) {
    res.status(500).json({
      status: 'online',
      db: 'erro na conexão',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});
app.get('/env', (req, res) => {
  res.json({
    DATABASE_URL: process.env.DATABASE_URL || null,
    NODE_ENV: process.env.NODE_ENV || null,
    // Se quiser, adicione outras variáveis que suspeita aqui
  });
});

module.exports = app;

// Só inicia o servidor localmente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}