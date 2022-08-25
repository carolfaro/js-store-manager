const salesModel = require('../models/salesModel');
const productsModel = require('../models/producstModel');
// const NotFoundError = require('../middlewares/errorDefault');

const salesService = {
  // async add(data) {
  //   const id = await salesModel.addSale();
  //   await salesModel.addSalesProducts(id, data);
  //   return id;
  // },

  async add(data) {
    const allProducts = await productsModel.findProductsId();

    const validation = data.every((item) =>
      allProducts.some((ele) => item.id === ele.productId));

    if (validation) {
      const id = await salesModel.addSale();
      const newSale = await salesModel.addSalesProducts(id, data);
      return newSale;
    }
    return false;
  },

  async get(id) {
    const getSale = await salesModel.get(id);
    return getSale;
  },
};

module.exports = salesService;

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