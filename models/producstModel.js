const connection = require('../db/index');

// testado 1
const getProducts = () => connection.execute('SELECT * FROM StoreManager.products;');

// falta essa
const findProductsId = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');

  return products;
};

// testado 2
const getProductsById = (id) => connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

// testado 3
const addProducts = async ({ name }) => {
  const [result] = await connection.execute(
   'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );

  return {
    id: result.insertId,
    name,
  };
};

// const checkIdProducts = async (arrayOfId) => {
//   const sql = 'SELECT * FROM StoreManager.products WHERE id IN (?);';

//   const [items] = await connection.query(sql, [arrayOfId]);
//   return items;
// };

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
  findProductsId,
};