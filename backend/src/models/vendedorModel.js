const db = require('../config/db');

const Vendedor = {
  getAll: async () => {
    const { rows } = await db.query('SELECT * FROM Vendedor ORDER BY id ASC');
    return rows;
  },
  getById: async (id) => {
    const { rows } = await db.query('SELECT * FROM Vendedor WHERE id = $1', [id]);
    return rows[0];
  },
  create: async (nombre, email, telefono) => {
    const { rows } = await db.query(
      'INSERT INTO Vendedor (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, telefono]
    );
    return rows[0];
  },
  update: async (id, nombre, email, telefono) => {
    const { rows } = await db.query(
      'UPDATE Vendedor SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *',
      [nombre, email, id]
    );
    return rows[0];
  },
  delete: async (id) => {
    await db.query('DELETE FROM Vendedor WHERE id = $1', [id]);
    return { message: 'Vendedor eliminado' };
  }
};

module.exports = Vendedor;