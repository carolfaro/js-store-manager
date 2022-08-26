const express = require('express');

const salesController = require('../controllers/salesController');
const validateSaleMiddleware = require('../middlewares/salesValidation');

const router = express.Router();

router
  .route('/')
  .post(validateSaleMiddleware, salesController.addSale)
  .get(salesController.allSales);
router
  .route('/:id')
  .get(salesController.salesById)
  .delete(salesController.deleteSale)
  .put(validateSaleMiddleware, salesController.updateSale);

module.exports = router;