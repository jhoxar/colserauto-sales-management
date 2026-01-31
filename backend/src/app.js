const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba para saber que el servidor vive
app.get('/', (req, res) => {
  res.send('Servidor de Colserauto activo');
});

// Probar conexión a la DB desde el navegador
app.get('/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ message: 'Conexión a DB exitosa', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error conectando a la DB', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});