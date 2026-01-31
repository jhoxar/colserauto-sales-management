const express = require('express');
const router = express.Router();
const { getVentas, createVenta, deleteVenta } = require('../controllers/ventaController');

router.get('/', getVentas);
router.post('/', createVenta);
router.delete('/:id', deleteVenta);

module.exports = router;