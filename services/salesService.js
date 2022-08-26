const salesModel = require('../models/salesModel');
const productsModel = require('../models/producstModel');

const salesService = {
  // teste 3
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

  // teste 1
  async getAllSales() {
    const sales = await salesModel.getAllSales();
    return sales;
  },

  // teste 2
  async getSalesById(id) {
    const salesById = await salesModel.salesById(id);
    return salesById;
  },

  async deleteSale(id) {
    const saleDelet = await salesModel.deleteSale(id);

    const { affectedRows } = saleDelet;

    if (affectedRows === 0) return false;

    return affectedRows;
  },

  async updateSale(id, body) {
    const salesById = await salesModel.salesById(id);
    console.log(salesById);
    if (salesById.length === 0) return { message: 'Sale not found' };

     const allProducts = await productsModel.findProductsId();

    const validation = body.every((item) =>
      allProducts.some((ele) => ele.id === item.productId));

    if (!validation) return { message: 'Product not found' };

    await salesModel.updateSale(id, body);

    const saleUpdated = {
      saleId: id,
      itemsUpdated: body,
    };

    return saleUpdated;
  },
};

module.exports = salesService;

// await salesService.getAllSales(); -> todas as vendas
// salesService.getSalesById(id);