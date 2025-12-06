const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const productController = require('../controllers/productController');

router.post('/upload', upload.single('image'), productController.uploadImage);
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.delete('/:id', productController.deleteProduct);

module.exports = router;