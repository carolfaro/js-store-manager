const express = require('express');

const router = express.Router();

const productsService = require('../services/productsServices');

router.get('/', async (_req, res) => {
  try {
    const [rows] = await productsService.getAllProducts();
    res.status(200).json(rows);
  } catch (err) {
     res.status(404).json({ message: 'Product not found' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await productsService.getAllProducts(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  } 
  return res.status(200).json(rows[0]);
  
//   try {
//     const { id } = req.params;
//    const [rows] = await productsService.getAllProducts(id);
//    res.status(200).json(rows);
//  } catch (err) {
//    console.log(err);
//    res.status(500).json({ message: 'Product not found' });
//  }
});

module.exports = router;