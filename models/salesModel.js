const connection = require('../db/index');

const salesModel = {
  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (default)';

    const [{ insertId }] = await connection.query(sql);

    return insertId;
  },

  async addSalesProducts(id, data) {
    const sql = `INSERT INTO StoreManager
    .sales_products (sale_id, product_id, quantity) VALUES ?`;
    const map = data.map((item) => [id, item.productId, item.quantity]);

    await connection.query(sql, [map]);
  },

  async get(id) {
    const sql = 'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;';

   const table = await connection.query(sql, id);
    return {
      id,
      itemsSold: table[0].map((ele) => ({
        productId: ele.product_id,
        quantity: ele.quantity,
      })),
    };
  },

};

module.exports = salesModel;
