const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const curriculoRoutes = require('./routes/curriculo');

app.use(cors());
app.use(express.json());

app.use('/api/curriculos', curriculoRoutes);

// Rota de health check
app.get('/', (req, res) => {
  res.json({ status: 'online', db: process.env.SUPABASE_DB_HOST ? 'conectado' : 'não configurado' });
});

module.exports = app;

// Só inicia o servidor localmente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}