const salesService = require('../services/salesService');

const salesController = {

  async addSale(req, res) {
    const data = req.body;
    const id = await salesService.add(data);
    // console.log(req.body);
    if (!id) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(201).json(id);
  },

  async allSales(_req, res) {
    const [rows] = await salesService.getAllSales();
      return res.status(200).json(rows);
  },

 async salesById(req, res) {
  const { id } = req.params;
  const [rows] = await salesService.getAllSales(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(rows[0]);
},
};

module.exports = salesController;
