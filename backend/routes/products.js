const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, upload } = require('../controllers/ProductController');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload, createProduct);
router.put('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;