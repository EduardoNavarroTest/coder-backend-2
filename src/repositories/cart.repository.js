// /repositories/cartRepository.js
import CartDao from "../dao/cart.dao.js";

class CartRepository {
    async createCart() {
        return await CartDao.createCart();
    }

    async getCartById(cartId) {
        return await CartDao.findById(cartId);
    }

    async getAllCarts() {
        return await CartDao.findAll();
    }

    async updateCart(cart) {
        return await CartDao.updateCart(cart);
    }

    async deleteCart(cartId) {
        return await CartDao.deleteCart(cartId);
    }
}

export default new CartRepository();
