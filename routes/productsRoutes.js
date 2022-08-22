const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.carol);

router.get('/:id', productsController.carolAll);

module.exports = router;