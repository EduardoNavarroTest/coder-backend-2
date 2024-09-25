import productService from "../services/product.services.js";

class ProductController {
 

    async getProducts(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const products = await productService.getProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query,
            });
            res.json({ status: 'success', payload: products });
        } catch (e) {
            console.error("Error recovering products", e);
            res.status(500).json({ e: "Server Error" });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.pid);
            res.json(product);
        } catch (e) {
            console.error("Error recovering product", e);
            res.status(500).json({ e: "Server Error" });
        }
    }

    async addProduct(req, res) {
        try {
            await productService.addProduct(req.body);
            res.status(201).json({ message: "Product successfully added" });
        } catch (e) {
            console.error("Error adding product", e);
            res.status(500).json({ e: "Server Error" });
        }
    }

    async updateProduct(req, res) {
        try {
            await productService.updateProduct(req.params.pid, req.body);
            res.json({ message: "Product successfully updated" });
        } catch (e) {
            console.error("Error updating product", e);
            res.status(500).json({ e: "Server Error" });
        }
    }

    async deleteProduct(req, res) {
        try {
            await productService.deleteProduct(req.params.pid);
            res.json({ message: "Product successfully deleted" });
        } catch (e) {
            console.error("Error deleting product", e);
            res.status(500).json({ e: "Server Error" });
        }
    }
}

export default new ProductController;
