require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

// Só executa o teste de conexão e os logs se NÃO estivermos no ambiente de teste (Jest)
if (process.env.NODE_ENV !== 'test') {
  pool.connect()
    .then(client => {
      console.log('Conectado ao PostgreSQL com sucesso!');
      client.release(); // Libera o cliente de volta para o pool
    })
    .catch(err => console.error('Erro de conexão', err.stack));
}
module.exports = pool;