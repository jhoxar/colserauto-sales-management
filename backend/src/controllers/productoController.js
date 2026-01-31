const Producto = require('../models/productoModel');

const getProductos = async (req, res) => {
  try {
    const data = await Producto.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const nuevo = await Producto.create(nombre, descripcion, precio);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  try {
    const actualizado = await Producto.update(id, nombre, descripcion, precio);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Producto.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };