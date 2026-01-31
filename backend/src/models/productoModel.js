const db = require('../config/db');

const Producto = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM Producto ORDER BY id ASC');
    return rows;
  },
  getById: async (id) => {
    const { rows } = await db.query('SELECT * FROM Producto WHERE id = $1', [id]);
    return rows[0];
  },
  create: async (nombre, descripcion, precio) => {
    const { rows } = await db.query(
      'INSERT INTO Producto (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, precio]
    );
    return rows[0];
  },
  update: async (id, nombre, descripcion, precio) => {
    const { rows } = await db.query(
      'UPDATE Producto SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, precio, id]
    );
    return rows[0];
  },
  delete: async (id) => {
    await db.query('DELETE FROM Producto WHERE id = $1', [id]);
    return { message: 'Servicio de Colserauto eliminado' };
  }
};

module.exports = Producto;