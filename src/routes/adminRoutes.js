const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');

// Login routes (not protected)
router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.logout);

// Protected admin UI
router.get('/orders', isAuth, isAdmin, adminController.renderOrders);
router.get('/orders/:id', isAuth, isAdmin, adminController.renderOrderDetail);
router.post('/orders/:id/status', isAuth, isAdmin, adminController.updateStatusFromUI);

module.exports = router;
