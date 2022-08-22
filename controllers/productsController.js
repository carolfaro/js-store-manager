const productsService = require('../services/productsServices');

const carol = async (_req, res) => {
  try {
    const [rows] = await productsService.getAllProducts();
    res.status(200).json(rows);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};
const carolAll = async (req, res) => {
  const { id } = req.params;
  const [rows] = await productsService.getAllProducts(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(rows[0]);
};

module.exports = { carol, carolAll };
