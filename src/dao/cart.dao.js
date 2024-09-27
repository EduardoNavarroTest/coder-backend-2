// /dao/cartDao.js
import CartModel from './models/cart.model.js';

class CartDao {
    // Crear un nuevo carrito
    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            return await newCart.save();
        } catch (error) {
            console.error("Error creando carrito:", error);
            throw error;
        }
    }

    // Buscar un carrito por su ID
    async findById(cartId) {
        try {
            return await CartModel.findById(cartId);
        } catch (error) {
            console.error("Error buscando carrito por ID:", error);
            throw error;
        }
    }

    // Obtener todos los carritos
    async findAll() {
        try {
            return await CartModel.find();
        } catch (error) {
            console.error("Error obteniendo todos los carritos:", error);
            throw error;
        }
    }

    // Actualizar un carrito completo
    async updateCart(cart) {
        try {
            return await CartModel.findByIdAndUpdate(cart._id, cart, { new: true });
        } catch (error) {
            console.error("Error actualizando carrito:", error);
            throw error;
        }
    }

    // Eliminar un carrito por su ID
    async deleteCart(cartId) {
        try {
            return await CartModel.findByIdAndDelete(cartId);
        } catch (error) {
            console.error("Error eliminando carrito:", error);
            throw error;
        }
    }

    // Añadir producto al carrito
    async addProduct(cartId, productId, quantity) {
        const cart = await this.findById(cartId);
        const existsProduct = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (existsProduct) {
            existsProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        cart.markModified("products");
        await cart.save();
        return cart;
    }

    // Eliminar producto del carrito
    async removeProduct(cartId, productId) {
        const cart = await this.findById(cartId);
        const productIndex = cart.products.findIndex(
            (product) => product.product._id.toString() === productId
        );

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
        }

        return cart;
    }

    // Limpiar carrito
    async cleanCart(cartId) {
        const cart = await this.findById(cartId);
        if (cart) {
            cart.products = [];
            await cart.save();
        }
        return cart;
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await this.findById(cartId);
        const existsProduct = cart.products.find(
            (item) => item.product._id.toString() === productId
        );

        console.log(cart.products);

        if (existsProduct) {
            existsProduct.quantity = quantity;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }

        cart.markModified("products");
        await cart.save();
        return cart;
    }

    // Actualizar la lista de productos del carrito
    async updateCartProducts(cartId, products) {
        const cart = await this.findById(cartId);
        if (cart) {
            cart.products = products;
            await cart.save();
        } else {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    }

    // Finalizar compra (simulación)
    async purchase(cartId) {
        const cart = await this.findById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        if (cart.products.length === 0) {
            throw new Error("No hay productos en el carrito para procesar la compra");
        }

        // Simulación de una compra (puedes integrar una API de pago o lógica adicional aquí)
        console.log("Compra realizada con éxito");

        // Limpiar el carrito después de la compra
        cart.products = [];
        await cart.save();

        return { message: "Compra realizada con éxito", cart };
    }
}

export default new CartDao();
