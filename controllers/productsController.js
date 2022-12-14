const productsService = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const [rows] = await productsService.getAllProducts();
    res.status(200).json(rows);
};

const getByIdProducts = async (req, res) => {
  const { id } = req.params;
  const [rows] = await productsService.getAllProducts(id);
  // console.log(rows);
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

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productsService.updateProducts(id, name);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json({ id, name });
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  
  const result = await productsService.deleteProducts(id);

  if (!result) res.status(404).json({ message: 'Product not found' });

  return res.status(204).end();
};

const getProductsByName = async (req, res) => {
  const { q } = req.query;
  const findByName = await productsService.getProductsByName(q);

  if (!findByName) res.status(404).json({ message: 'Product not found' });

   return res.status(200).json(findByName);
};

module.exports = {
  getByIdProducts,
  getAllProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsByName,
};
