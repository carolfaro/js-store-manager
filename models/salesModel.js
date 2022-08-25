const connection = require('../db/index');

const salesModel = {
  async addSale(sale) {
    const [saleAdd] = await connection
      .execute('INSERT INTO StoreManager.sales (date) VALUES (default)');
    
    await sale.forEach(async (item) => {
      await connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [saleAdd.insertId, item.productId, item.quantity],
      );
    });

    return saleAdd.insertId;
  },

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
  // async addSale() {
  //   const sql = 'INSERT INTO StoreManager.sales (date) VALUES (default)';

  //   const [{ insertId }] = await connection.query(sql);

  //   return insertId;
  // },

  // async addSalesProducts(id, data) {
  //   const sql = `INSERT INTO StoreManager
  //   .sales_products (sale_id, product_id, quantity) VALUES ?`;
  //   const map = data.map((item) => [id, item.productId, item.quantity]);
  //   console.log(map);
  //   const carol = await connection.query(sql, [map]);
  //   return carol;
  // },