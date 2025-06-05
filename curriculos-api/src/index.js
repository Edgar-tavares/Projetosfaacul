const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis do .env

const app = express();
const curriculoRoutes = require('./routes/curriculo');

app.use(cors());
app.use(express.json());

app.use('/api/curriculos', curriculoRoutes);

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
