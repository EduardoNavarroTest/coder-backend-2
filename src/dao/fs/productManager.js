import fs from "fs";

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct = async ({ title, description, code, price, stock, thumbnails, category }) => {

        const arrProducts = await this.readFile();
        const status = true;

        // Controlar que todos los campos existan
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            console.log(`All fields are required`);
            return;
        }

        // Verificar si el código existe
        if (arrProducts.some(product => product.code === code)) {
            console.log(`Existing code ${code}`);
            return;
        }

        //Agregar al array
        const id = await this.generateId();
        const newProduct = { id, title, description, price, thumbnails, code, stock, status, category }
        arrProducts.push(newProduct);

        //Guardar en el archivo
        await this.saveFile(arrProducts)

    }

    getProducts = async () => {
        const products = await this.readFile();
        return products;
    }

    getProductById = async (id) => {
        const products = await this.readFile();
        return products.find(product => product.id === parseInt(id)) || `Not Found`;
    }

    generateId = async () => {
        const arrProducts = await this.readFile();
        const maxId = arrProducts.reduce((max, product) => {
            return product.id > max ? product.id : max;
        }, 0);
        return maxId + 1;
    }

    updateProduct = async (id, productUpdate) => {
        try {
            const arrProducts = await this.readFile();

            const index = arrProducts.findIndex(item => item.id === id);
            console.log('el index es:' + index)

            if (index !== -1) {
                arrProducts[index] = { ...arrProducts[index], ...productUpdate };
                await this.saveFile(arrProducts);
                console.log("Product update");
            } else {
                console.log("Product not found");
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    deleteProduct = async (id) => {
        const arrProducts = await this.readFile();
        const arr = arrProducts.filter(product => product.id !== id);
        this.saveFile(arr);
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

export default ProductManager;