// /dao/cartDao.js
import CartModel from "./models/cart.model.js";

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

    // Actualizar un carrito
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
}

export default new CartDao();
