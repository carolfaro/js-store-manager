const salesModel = require('../models/salesModel');
const productsModel = require('../models/producstModel');

const salesService = {

  async add(data) {
    const allProducts = await productsModel.findProductsId();

    const validation = data.every((item) =>
      allProducts.some((ele) => ele.id === item.productId));
    
    if (!validation) return false;

    const newSale = await salesModel.addSale(data);

    const saleInserted = {
      id: newSale,
      itemsSold: data,
    };

    return saleInserted;
  },

  async getAllSales() {
    const sales = await salesModel.getAllSales();
    return sales;
  },

  async getSalesById(id) {
    const salesById = await salesModel.salesById(id);
    return salesById;
  },
};

module.exports = salesService;

// await salesService.getAllSales(); -> todas as vendas
// salesService.getSalesById(id);