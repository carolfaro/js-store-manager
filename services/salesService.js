const salesModel = require('../models/salesModel');

const salesService = {

  async add(data) {
    const id = await salesModel.addSale();
    await salesModel.addSalesProducts(id, data);
    return id;
  },

  async get(id) {
    const getSale = await salesModel.get(id);
    return getSale;
  },

  // async checkId(arrayOfId) {
  //   const items = await productModel.checkIdProducts(arrayOfId);
  //   console.log(items);
  //   if (!items.length) return true;

  //   items.forEach((item) => {
  //     if (!arrayOfId.includes(item.productId)) {
  //       return true;
  //     }
  //   });
  // },

  // async errorProduct(_req, res) {
  //   res.status(404).json({ message: 'Product not found' });
  // },

};

module.exports = salesService;
