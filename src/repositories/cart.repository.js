// repository/cartRepository.js
import CartDao from '../dao/cart.dao.js';

class CartRepository {
    async createCart() {
        return await CartDao.createCart();
    }

    async findById(cartId) {
        return await CartDao.findById(cartId);
    }

    async findAll() {
        return await CartDao.findAll();
    }

    async addProduct(cartId, productId, quantity) {
        return await CartDao.addProduct(cartId, productId, quantity);
    }

    async removeProduct(cartId, productId) {
        return await CartDao.removeProduct(cartId, productId);
    }

    async cleanCart(cartId) {
        return await CartDao.cleanCart(cartId);
    }

    async updateCartProducts(cartId, products) {
        return await CartDao.updateCartProducts(cartId, products);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await CartDao.updateProductQuantity(cartId, productId, quantity);
    }
}

export default new CartRepository();
