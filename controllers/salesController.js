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
  const [rows] = await salesService.getAllSales(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(rows[0]);
},
};

module.exports = salesController;

//   const newSale = await salesService.add(data);
  //   // console.log(req.body);
  //   if (!newSale) {
  //      return res.status(404).json({ message: 'Product not found' });
  //   }
  //  return res.status(201).json(newSale);