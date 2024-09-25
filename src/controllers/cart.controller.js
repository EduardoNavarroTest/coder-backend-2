// /controllers/cartController.js
import CartService from "../services/cart.services.js";

class CartController {
    async createCart(req, res) {
        try {
            const cart = await CartService.createCart();
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCarts(req, res) {
        try {
            const carts = await CartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCartById(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await CartService.getCartById(cartId);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        try {
            await CartService.addProductToCart(cid, pid, quantity);
            res.status(201).json({ message: "Product added to cart" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            await CartService.removeProductFromCart(cid, pid);
            res.status(201).json({ message: "Product removed from cart" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async cleanCart(req, res) {
        const { cid } = req.params;
        try {
            await CartService.cleanCart(cid);
            res.status(201).json({ message: "Cart cleaned" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CartController();
