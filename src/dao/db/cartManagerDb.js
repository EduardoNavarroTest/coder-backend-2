import CartModel from "../models/cart.model.js";

class CartManager {
    createCart = async () => {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    addCart = async (cartId, productId, quantity) => {
        // Controlar que todos los campos existan
        if (!cartId || !productId || !quantity) {
            console.log(`All fields are required`);
            return;
        }

        try {
            const cart = await this.getCartById(cartId);
            const existsProduct = cart.products.find(
                (item) => item.product._id.toString() === productId
            );

            if (existsProduct) {
                existsProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    getCarts = async () => {
        const cart = await CartModel.find();
        return cart || `Carts Not Found`;
    };

    getCartById = async (id) => {
        try {
            const cart = await CartModel.findById(id);
            return cart || `Cart Not Found`;
        } catch (error) {
            console.log("Error find cart: " + error);
        }
    };

    removeProductCart = async (cid, pid) => {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                return "Cart Not Found";
            }

            // Encuentra el índice del producto en el array de productos del carrito
            const productIndex = cart.products.findIndex(
                (product) => product.product._id.toString() === pid
            );

            // Si el producto no se encuentra, devuelve un mensaje
            if (productIndex === -1) {
                return "Product Not Found in Cart";
            }

            // Elimina el producto del array de productos
            cart.products.splice(productIndex, 1);

            // Guarda los cambios en la base de datos
            await cart.save();

            return cart;
        } catch (error) {
            console.log("Error find product in cart: " + error);
        }
    };

    updateQuantityProductCart = async (cid, pid, quantity) => {
        try {
            const cart = await this.getCartById(cid);
            const existsProduct = cart.products.find(
                (item) => item.product._id.toString() === pid
            );

            if (existsProduct) {
                existsProduct.quantity = quantity;
            } else {
                console.log("Product does not exist in the cart");
                return "Product does not exist in the cart";
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    cleanCart = async (cid) => {
        try {
            const cart = await this.getCartById(cid);

            if (cart) {
                cart.products = [];
            } else {
                console.log("Cart not exists");
                return "Cart not exists";
            }
            await cart.save();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    updateProductsCart = async (cid, products) => {
        try {
            const cart = await this.getCartById(cid);

            if (cart) {
                cart.products = products;
            } else {
                console.log("Cart not exists");
                return "Cart not exists";
            }
            await cart.save();
            console.log("Products update in the Cart");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };
}

export default CartManager;
