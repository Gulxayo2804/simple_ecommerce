const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');

// User routes
router.post('/', isAuth, orderController.placeOrder);
router.get('/', isAuth, orderController.getUserOrders);
router.get('/:id', isAuth, orderController.getOrderById);

// Admin API routes
router.get('/admin/all', isAuth, isAdmin, orderController.adminGetOrders);
router.put('/admin/:id/status', isAuth, isAdmin, orderController.adminUpdateStatus);

module.exports = router;
