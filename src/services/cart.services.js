// services/cartService.js
import CartDao from '../dao/cart.dao.js';
import CartDto from '../dto/cart.dto.js';
import ProductModel from '../dao/models/products.model.js';
import CartModel from '../dao/models/cart.model.js';
import UsuarioModel from '../dao/models/user.models.js';
import TicketModel from '../dao/models/tickets.model.js';
import { calculateTotal } from '../utils/utils.js';

class CartService {
    async createCart() {
        const cart = await CartDao.createCart();
        return new CartDto(cart);
    }

    async getAllCarts() {
        const carts = await CartDao.findAll();
        return carts.map(cart => new CartDto(cart));
    }

    async getCartById(cartId) {
        const cart = await CartDao.findById(cartId);
        return cart ? new CartDto(cart) : null;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartDao.addProduct(cartId, productId, quantity);
        return new CartDto(cart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await CartDao.removeProduct(cartId, productId);
        return new CartDto(cart);
    }

    async cleanCart(cartId) {
        const cart = await CartDao.cleanCart(cartId);
        return new CartDto(cart);
    }

    async purchase (cid) {
        const cart = await CartModel.findById(cid);
        const arrProducts = cart.products;
        const productsNotAvailable = [];
    
        for (const item of arrProducts) {
            const productId = item.product;
            const product = await ProductModel.findById(productId);
            if (product.stock > item.quantity) {
                product.stock -= item.quantity;
                await product.save();
            } else {
                productsNotAvailable.push(productId);
            }
        }
    
        const userCart = await UsuarioModel.findOne({ cart: cid });
        const ticket = new TicketModel({
            purchase_datetime: new Date(),
            amount: calculateTotal(arrProducts), // Asegúrate de definir esta función
        });
        await ticket.save();
    
        cart.products = cart.products.filter(item => 
            productsNotAvailable.some(productId => productId.equals(item.product))
        );
        await cart.save();
    
        return {
            ticket: {
                id: ticket._id,
                amount: ticket.amount               
            },
            productsNotAvailable
        };
    }

    async updateProductsCart(cartId, products) {
        const cart = await CartDao.updateCartProducts(cartId, products);
        return new CartDto(cart);
    }

    async updateQuantityProductCart(cartId, productId, quantity) {
        const cart = await CartDao.updateProductQuantity(cartId, productId, quantity);
        return new CartDto(cart);
    }
}

export default new CartService();
