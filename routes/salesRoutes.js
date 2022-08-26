const express = require('express');

const salesController = require('../controllers/salesController');
const validateSaleMiddleware = require('../middlewares/salesValidation');

const router = express.Router();

router.route('/')
  .get(salesController.allSales)
  .post(validateSaleMiddleware, salesController.addSale);
router
  .route('/:id')
  .get(salesController.salesById)
  .delete(salesController.deleteSale);

module.exports = router;