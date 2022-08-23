const productsService = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
    const [rows] = await productsService.getAllProducts();
    res.status(200).json(rows);
};

const getByIdProducts = async (req, res) => {
  const { id } = req.params;
  const [rows] = await productsService.getAllProducts(id);
  console.log(rows.length);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(rows[0]);
};

const addProducts = async (req, res) => {
  const { name } = req.body;
  
  const newProduct = await productsService.addProducts({ name });

  res.status(201).json(newProduct);
};

module.exports = { getByIdProducts, getAllProducts, addProducts };
