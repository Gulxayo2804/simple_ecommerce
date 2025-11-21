const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', isAuth, isAdmin, upload.single('image'), productController.createProduct);
router.put('/:id',isAuth, isAdmin, productController.updateProduct);
router.delete('/:id',isAuth, isAdmin, productController.deleteProduct);
router.get('/search', productController.searchProducts);

module.exports = router;
