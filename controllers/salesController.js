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
};

module.exports = salesController;
