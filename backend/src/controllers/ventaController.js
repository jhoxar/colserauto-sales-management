const Venta = require('../models/ventaModel');

const getVentas = async (req, res) => {
  try {
    const data = await Venta.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVenta = async (req, res) => {
  const { id_vendedor, id_producto, cantidad, total } = req.body;
  try {
    const nueva = await Venta.create(id_vendedor, id_producto, cantidad, total);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Venta.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getVentas, createVenta, deleteVenta };