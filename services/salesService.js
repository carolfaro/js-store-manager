const salesModel = require('../models/salesModel');

const salesService = {

  async add(data) {
    const id = await salesModel.addSale();
  },
};

module.exports = { salesService };

// add para adcionar venda add(data)
// get(id) ver
// addSales_produt -> para sales_product