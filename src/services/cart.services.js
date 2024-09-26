// /services/cartService.js
import CartRepository from "../repositories/cart.repository.js";
import TicketModel from "../dao/models/tickets.model.js"
import UsuarioModel from "../dao/models/user.models.js"
import { calculateTotal } from "../utils/utils.js";
import ProductRepository from "../repositories/product.repository.js";

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
        console.log("Carrito completo:", cart);
        console.log("Productos antes del filtro:", cart.products);
        console.log("ID del producto a eliminar:", productId.toString());
    
        cart.products = cart.products.filter(product => product.product && product.product._id && product.product._id.toString() !== productId.toString());
    
        console.log("Productos después del filtro:", cart.products);
        return await this.updateCart(cart);
    }
    
    

    async cleanCart(cartId) {
        const cart = await this.getCartById(cartId);
        cart.products = [];
        return await this.updateCart(cart);
    }
    async updateProductsCart(cartId, products) {
        const cart = await this.getCartById(cartId);
        cart.products = products; // Asumiendo que `products` es un array de objetos con `product` y `quantity`
        return await this.updateCart(cart);
    }

    async updateQuantityProductCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(item => item.product._id.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            throw new Error("El producto no existe en el carrito");
        }

        return await this.updateCart(cart);
    }

    async purchase(cartId) {
        const cart = await this.getCartById(cartId);
        const productsNotAvailable = [];

        for (const item of cart.products) {
            const product = await ProductRepository.getProductById(item.product);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await ProductRepository.updateProduct(product); // Asegúrate de tener esta función
            } else {
                productsNotAvailable.push(product.id);
            }
        }

        // Crear el ticket
            const ticket = new TicketModel({
            purchase_datetime: new Date(),
            amount: calculateTotal(cart.products),
        })

        // Eliminar productos no disponibles del carrito
        cart.products = cart.products.filter(item => !productsNotAvailable.includes(item.product));
        await this.updateCart(cart);

        return {
            message: "Compra realizada con éxito",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser,
            },
            productsNotAvailable,
        };
    }
}

export default new CartService();