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

    async searchProducts(filters) {
        return productRepository.searchAndFilter(filters);
    }
}

module.exports = new ProductService();
