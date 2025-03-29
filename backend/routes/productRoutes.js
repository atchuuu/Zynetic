const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const authMiddleware = require('../middleware/authorization');

router.post('/', authMiddleware, productController.createProduct);
router.get('/', productController.getAllProducts);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.get('/filter', productController.filterProducts);
router.get('/search', productController.searchProducts);

module.exports = router;