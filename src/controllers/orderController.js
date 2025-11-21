const orderService = require('../services/orderService');

exports.placeOrder = async (req, res, next) => {
  try {
    // expected body: { items: [{ productId, quantity }], address: '...' }
    const user = { userId: req.userId, email: req.userEmail }; // set by is-auth
    const order = await orderService.placeOrder({ user, items: req.body.items, address: req.body.address });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // allow user to view only their own order unless admin
    if (req.role !== 'admin' && String(order.user.id) !== String(req.userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// ADMIN actions
exports.adminGetOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await orderService.adminGetAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.adminUpdateStatus = async (req, res, next) => {
  try {
    const updated = await orderService.adminUpdateOrderStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
