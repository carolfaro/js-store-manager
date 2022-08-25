const connection = require('../db/index');

const getProducts = () => connection.execute('SELECT * FROM StoreManager.products;');

const getProductsById = (id) => connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

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
};