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

  // testado 2
  async salesById(id) {
     const [saleById] = await connection.execute(
       `
  SELECT s.date,
         sp.product_id AS productId,
         sp.quantity
    FROM StoreManager.sales AS s
   INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
   WHERE s.id = ?;`,
       [id],
     );
    //  if (saleById.length === 0) return null;
     return saleById;
  },

  // testado 1
  async getAllSales() {
    const sales = await connection.execute(`
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
    return sales;
  },
};

module.exports = salesModel;

// await salesModel.getAllSales();-> todas as vendas
// salesModel.salesById(id); => por id