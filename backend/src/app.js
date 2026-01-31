const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Importar las rutas de cada entidad
const vendedorRoutes = require('./routes/vendedorRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares globales
app.use(cors());
app.use(express.json()); // Vital para recibir JSON del Front

// 3. Vincular las rutas con sus prefijos (La magia del RESTful)
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);

// Ruta base de cortesía
app.get('/', (req, res) => {
  res.send(' API de Colserauto camellando al 100%');
});

// 4. Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`Endpoint Vendedores: http://localhost:${PORT}/api/vendedores`);
});