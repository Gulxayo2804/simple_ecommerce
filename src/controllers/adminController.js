const orderService = require('../services/orderService');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getLoginPage = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password || user.role !== 'admin') {
      return res.render('admin/login', { error: 'Invalid credentials or not admin' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // set HttpOnly cookie for admin UI
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect('/admin/orders');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
};

exports.renderOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await orderService.adminGetAll({ page, limit });
    res.render('admin/orders', { orders: result.orders, total: result.total, page, limit });
  } catch (err) {
    next(err);
  }
};

exports.renderOrderDetail = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.render('admin/orderDetail', { order });
  } catch (err) {
    next(err);
  }
};

exports.updateStatusFromUI = async (req, res, next) => {
  try {
    await orderService.adminUpdateOrderStatus(req.params.id, req.body.status);
    res.redirect('/admin/orders/' + req.params.id);
  } catch (err) {
    next(err);
  }
};
