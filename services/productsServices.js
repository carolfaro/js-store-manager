const productsModel = require('../models/producstModel');

const getAllProducts = (id = null) => {
  if (id) {
    return productsModel.getProductsById(id);
  }  
  return productsModel.getProducts();
};

module.exports = {
  getAllProducts,
  
};