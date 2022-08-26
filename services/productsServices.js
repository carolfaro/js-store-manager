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

const updateProducts = async (id, name) => {
  const update = await productsModel.updateProducts(id, name);
  const { affectedRows } = update;

  if (affectedRows === 0) return false;

  return affectedRows;
};

const deleteProducts = async (id) => {
  const deletePr = await productsModel.deleteProducts(id);

  const { affectedRows } = deletePr;

  if (affectedRows === 0) return false;

  return affectedRows;
};

module.exports = {
  getAllProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};