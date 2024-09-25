// /services/cartService.js
import CartRepository from "../repositories/cart.repository.js";

class CartService {
    async createCart() {
        return await CartRepository.createCart();
    }

    async getCartById(cartId) {
        return await CartRepository.getCartById(cartId);
    }

    async getAllCarts() {
        return await CartRepository.getAllCarts();
    }

    async updateCart(cart) {
        return await CartRepository.updateCart(cart);
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await this.updateCart(cart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        cart.products = cart.products.filter(product => product.product.toString() !== productId);
        return await this.updateCart(cart);
    }

    async cleanCart(cartId) {
        const cart = await this.getCartById(cartId);
        cart.products = [];
        return await this.updateCart(cart);
    }
}

export default new CartService();
