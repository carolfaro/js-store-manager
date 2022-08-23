const productsModel = require('../models/producstModel');

const getAllProducts = (id = null) => {
  if (id) {
    return productsModel.getProductsById(id);
  }  
  return productsModel.getProducts();
};

const addProducts = async ({ name }) => {
  const { id } = await productsModel.addProducts({ name });

  return {
    id,
    name,
  };
};

module.exports = {
  getAllProducts,
  addProducts,
};