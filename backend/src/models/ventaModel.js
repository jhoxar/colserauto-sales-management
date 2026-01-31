const db = require('../config/db');

const Venta = {
  getAll: async () => {
    const query = `
      SELECT v.id, ven.nombre as vendedor, p.nombre as producto, v.fecha, v.cantidad, v.total 
      FROM Venta v
      JOIN Vendedor ven ON v.id_vendedor = ven.id
      JOIN Producto p ON v.id_producto = p.id
      ORDER BY v.fecha DESC`;
    const { rows } = await db.query(query);
    return rows;
  },
  create: async (id_vendedor, id_producto, cantidad, total) => {
    const { rows } = await db.query(
      'INSERT INTO Venta (id_vendedor, id_producto, cantidad, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_vendedor, id_producto, cantidad, total]
    );
    return rows[0];
  },
  delete: async (id) => {
    await db.query('DELETE FROM Venta WHERE id = $1', [id]);
    return { message: 'Venta eliminada' };
  }
};

module.exports = Venta;