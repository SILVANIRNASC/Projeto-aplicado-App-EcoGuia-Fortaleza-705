require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Testando a conexão ao iniciar
pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('Erro de conexão', err.stack));

module.exports = pool;