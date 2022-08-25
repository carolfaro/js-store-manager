const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .post(salesController.addSale);

module.exports = router;