const orderRepo = require('../repositories/orderRepository');
const Product = require('../models/product');

class OrderService {
  async placeOrder({ user, items, address }) {
    const detailedItems = await Promise.all(items.map(async it => {
      const product = await Product.findById(it.productId);
      if (!product) throw new Error('Product not found: ' + it.productId);
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: it.quantity || 1
      };
    }));

    const total = detailedItems.reduce((s, i) => s + i.price * i.quantity, 0);

    const orderData = {
      user: { id: user.userId, email: user.email },
      items: detailedItems,
      total,
      address
    };

    const order = await orderRepo.create(orderData);
    return order;
  }

  async getUserOrders(userId) {
    return orderRepo.getByUserId(userId);
  }

  async getOrderById(id) {
    return orderRepo.getById(id);
  }

  async adminGetAll({ page, limit }) {
    return orderRepo.getAll({ page, limit });
  }

  async adminUpdateOrderStatus(id, status) {
    return orderRepo.updateStatus(id, status);
  }
}

module.exports = new OrderService();
