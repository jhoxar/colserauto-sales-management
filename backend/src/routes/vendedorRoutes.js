const express = require('express');
const router = express.Router();
const { 
  getVendedores, 
  getVendedorById, 
  createVendedor, 
  updateVendedor, 
  deleteVendedor 
} = require('../controllers/vendedorController');

// Definición de rutas RESTful
router.get('/', getVendedores);          // GET /api/vendedores
router.get('/:id', getVendedorById);    // GET /api/vendedores/1
router.post('/', createVendedor);       // POST /api/vendedores
router.put('/:id', updateVendedor);      // PUT /api/vendedores/1
router.delete('/:id', deleteVendedor);   // DELETE /api/vendedores/1

module.exports = router;