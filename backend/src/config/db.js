require('dotenv').config();
const { Pool } = require('pg');

// Mantenemos su log de debug para saber que el .env está cargando nítido
console.log("Usuario DB cargado:", process.env.DB_USER);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT || 5432, // Fallback al puerto estándar por si acaso
});

/**
 * CAMBIO CLAVE: 
 * Usamos 'once' en lugar de 'on' para que el mensaje de éxito 
 * solo salga una vez al arrancar el motor del backend.
 */
pool.once('connect', () => {
  console.log('Conexión inicial exitosa con la DB de Colserauto 🚀');
});

// Capturamos errores globales del pool para que no se le caiga el servidor
pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de PostgreSQL:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};