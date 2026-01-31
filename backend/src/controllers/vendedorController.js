const Vendedor = require('../models/vendedorModel');

// Traer todos los vendedores
const getVendedores = async (req, res) => {
  try {
    const data = await Vendedor.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vendedores', details: error.message });
  }
};

// Traer uno solo por ID
const getVendedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Vendedor.getById(id);
    if (!data) return res.status(404).json({ message: 'Vendedor no encontrado' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo vendedor
const createVendedor = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) return res.status(400).json({ message: 'Nombre y email son obligatorios' });
  
  try {
    const nuevo = await Vendedor.create(nombre, email, telefono);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar datos
const updateVendedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  try {
    const actualizado = await Vendedor.update(id, nombre, email, telefono);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Borrar (El que no sirve, que no estorbe)
const deleteVendedor = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Vendedor.delete(id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getVendedores, 
  getVendedorById, 
  createVendedor, 
  updateVendedor, 
  deleteVendedor 
};