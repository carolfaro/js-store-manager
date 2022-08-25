const connection = require('../db/index');

const salesModel = {
  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (default)';

    const [{ insertId }] = await connection.query(sql);

    return insertId;
  },

  async addSalesProducts(id, data) {
    // console.log(id);
    // console.log(data);
    const sql = `INSERT INTO StoreManager
    .sales_products (sale_id, product_id, quantity) VALUES ?`;
    const map = data.map((item) => [id, item.productId, item.quantity]);
    await connection.query(sql, [map]);
  },

  // async get(id) {
  //   const sql = 'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;';

  //   const table = await connection.query(sql, id);
  //   return {
  //     id,
  //     itemsSold: table[0].map((ele) => ({
  //       productId: ele.product_id,
  //       quantity: ele.quantity,
  //     })),
  //   };
  // },

  async get(id) {
    const carol = await connection
      .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
    return carol;
  },

  async getAllSales() {
    const carol = await connection.execute(`
  SELECT 
    s.id AS saleId,
    s.date AS date,
    sp.product_id as productId,
    sp.quantity as quantity
  FROM
    StoreManager.sales AS s
    INNER JOIN
    StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
  `);
    return carol;
  },
};

module.exports = salesModel;
