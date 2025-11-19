const Product = require('../models/product');

class ProductRepository {
    async getAll() {
        return Product.find();
    }

    async getById(id) {
        return Product.findById(id);
    }

    async create(productData) {
        const product = new Product(productData);
        return product.save();
    }

    async update(id, productData) {
        return Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return Product.findByIdAndDelete(id);
    }

    async searchAndFilter({ keyword, minPrice, maxPrice, category }) {
        const query = {};

        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ];
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined) query.price.$gte = minPrice;
            if (maxPrice !== undefined) query.price.$lte = maxPrice;
        }

        if (category) {
            query.category = category;
        }

        return Product.find(query);
    }
}

module.exports = new ProductRepository();
