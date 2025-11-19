const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts() {
    return productRepository.getAll();
  }

  async getProductById(id) {
    return productRepository.getById(id);
  }

  async createProduct(data) {
    return productRepository.create(data);
  }

  async updateProduct(id, data) {
    return productRepository.update(id, data);
  }

  async deleteProduct(id) {
    return productRepository.delete(id);
  }
}

module.exports = new ProductService();
