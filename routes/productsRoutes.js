const express = require('express');

const productsController = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsValidation');

const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsValidation, productsController.addProducts);

router
  .route('/:id')
  .get(productsController.getByIdProducts)
  .put(productsValidation, productsController.updateProducts)
  .delete(productsController.deleteProducts);

module.exports = router;