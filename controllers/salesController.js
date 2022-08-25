const salesService = require('../services/salesService');

const salesController = {

  async addSale(req, res) {
    const data = req.body;
    const id = await salesService.add(data);
    const sale = await salesService.get(id);
    res.status(201).json(sale);
  },
};

module.exports = { salesController };