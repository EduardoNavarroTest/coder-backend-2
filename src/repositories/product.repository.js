import ProductDao from "../dao/product.dao.js";

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao();
    }

    async getAllProducts(query) {
        return this.productDao.getProducts(query);
    }

    async getProductById(id) {
        return this.productDao.getProductById(id);
    }

    async createProduct(productData) {
        return this.productDao.addProduct(productData);
    }

    async updateProduct(id, productUpdate) {
        return this.productDao.updateProduct(id, productUpdate);
    }

    async deleteProduct(id) {
        return this.productDao.deleteProduct(id);
    }
}

export default new ProductRepository();