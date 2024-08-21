import fs from "fs";

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    createCart = async () => {
        const arrCart = await this.readFile();
        const id = await this.generateId();
        const newCart = { id, products: [] };
        arrCart.push(newCart)
        await this.saveFile(arrCart);
    }

    addCart = async (cartId, productId, quantity) => {

        // Controlar que todos los campos existan
        if (!cartId || !productId || !quantity) {
            console.log(`All fields are required`);
            return;
        }

        const arrCart = await this.readFile();
        const cart = arrCart.find(item => item.id === parseInt(cartId));
        
        if (!cart) {
            console.log(`Cart not found`);
            return;
        }
        
        const existsProduct = cart.products.find(item => item.product === parseInt(productId));
        console.log(existsProduct)     

        existsProduct ? existsProduct.quantity += quantity : cart.products.push({product: parseInt(productId), quantity})

        //Guardar en el archivo
        await this.saveFile(arrCart)

    }

    getCarts = async () => {
        return await this.readFile();
    }

    getCartById = async (id) => {
        const cart = await this.readFile();
        return cart.find(item => item.id === parseInt(id));
    }

    generateId = async () => {
        const arrCarts = await this.readFile();
        const maxId = arrCarts.reduce((max, cart) => {
            return cart.id > max ? cart.id : max;
        }, 0);
        return maxId + 1;
    }

    saveFile = async (arr) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(arr, null, 2));
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    readFile = async () => {
        try {
            const file = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(file);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

}

export default CartManager;