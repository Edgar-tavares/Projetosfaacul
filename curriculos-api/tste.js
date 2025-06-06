// test-db.js
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://curriculos_api_user:G12Npc7U4eijag6SOUc5PsRQb4AEAwhL@dpg-d112mg15pdvs73ehr6l0-a.oregon-postgres.render.com/curriculos_api?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

console.log('🔗 Conectando ao banco de dados...');
client.connect()
  .then(() => console.log('✅ Conectado ao banco!'))
  .catch(err => console.error('❌ Erro de conexão:', err))
  .finally(() => client.end());