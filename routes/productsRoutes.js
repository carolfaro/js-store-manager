const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getByIdProducts);

router.post('/', productsController.addProducts);

module.exports = router;
