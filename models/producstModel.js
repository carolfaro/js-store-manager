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

const updateProducts = async (id, name) => {
   const [row] = await connection.query(
     `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;
    `,
     [name, id],
   );
  
  return row;
};

const deleteProducts = async (id) => {
   const [row] = await connection.query(
     `
    DELETE FROM StoreManager.products
    WHERE id = ?;
    `,
     [id],
   );

   return row;
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
  findProductsId,
  updateProducts,
  deleteProducts,
};