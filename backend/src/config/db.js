require('dotenv').config();
const { Pool } = require('pg');

console.log("Usuario cargado:", process.env.DB_USER);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Conexión establecida con la DB de Colserauto');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};