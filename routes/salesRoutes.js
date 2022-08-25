const express = require('express');

const salesController = require('../controllers/salesController');
const validateSaleMiddleware = require('../middlewares/salesValidation');

const router = express.Router();

router.route('/')
  .post(validateSaleMiddleware, salesController.addSale);

module.exports = router;