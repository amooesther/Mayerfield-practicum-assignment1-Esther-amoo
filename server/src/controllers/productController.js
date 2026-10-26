import { query } from '../config/db.js';

// GET /api/products
export async function getProducts(req, res, next) {
  try {
    const { category } = req.query;

    let sql = 'SELECT * FROM products';
    const params = [];

    if (category && category !== 'All') {
      sql += ' WHERE LOWER(category) = LOWER($1)';
      params.push(category);
    }

    sql += ' ORDER BY id ASC';

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:id
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `Product with ID ${id} not found`,
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
