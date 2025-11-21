const Order = require('../models/order');

class OrderRepository {
  async create(orderData) {
    const order = new Order(orderData);
    return order.save();
  }

  async getById(id) {
    return Order.findById(id).populate('items.product');
  }

  async getByUserId(userId) {
    return Order.find({ 'user.id': userId }).sort({ createdAt: -1 });
  }

  async getAll({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('items.product'),
      Order.countDocuments()
    ]);
    return { orders, total };
  }

  async updateStatus(id, status) {
    return Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

module.exports = new OrderRepository();
