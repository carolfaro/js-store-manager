const salesService = require('../services/salesService');

const salesController = {
  // teste 3 OK falta retorno negativo
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

  // teste 1 OK
  async allSales(_req, res) {
    const [rows] = await salesService.getAllSales();
    return res.status(200).json(rows);
  },

  // teste 2 OK
  async salesById(req, res) {
    const { id } = req.params;
    const rows = await salesService.getSalesById(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(rows);
  },

  async deleteSale(req, res) {
    const { id } = req.params;
    const rows = await salesService.deleteSale(id);
    if (!rows) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(204).end();
  },

  async updateSale(req, res) {
    const { id } = req.params;

    try {
      const updateSaleOK = await salesService.updateSale(id, req.body);

      if (updateSaleOK.message) {
       return res.status(404).json(updateSaleOK);
      }
      return res.status(200).json(updateSaleOK);
    } catch (error) {
       res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = salesController;

// .get(salesController.allSales) -> todas as vendas
// .get(salesController.salesById); -> pelo id
