const salesService = require('../services/salesService');

const salesController = {

  async addSale(req, res) {
    const data = req.body;

    try {
      const newSaleAdd = await salesService.add(data);

      if (!newSaleAdd) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(201).json(newSaleAdd);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async allSales(_req, res) {
    const [rows] = await salesService.getAllSales();
      return res.status(200).json(rows);
  },

 async salesById(req, res) {
  const { id } = req.params;
  const rows = await salesService.getSalesById(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(rows);
},
};

module.exports = salesController;

// .get(salesController.allSales) -> todas as vendas
// .get(salesController.salesById); -> pelo id
