const connection = require('../db/index');

const getProducts = () => connection.execute('SELECT * FROM StoreManager.products;');

const getProductsById = (id) => connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

module.exports = {
  getProducts,
  getProductsById,
};