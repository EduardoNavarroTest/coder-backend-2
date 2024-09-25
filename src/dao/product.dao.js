import ProductModel from "./models/products.model.js";

class ProductDao {
    async getProducts(query) {
        return await ProductModel.find(query);
    }

    async getProductById(id) {
        return await ProductModel.findById(id);
    }

    async addProduct(product) {
        const newProduct = new ProductModel(product);
        return await newProduct.save();
    }

    async updateProduct(id, productUpdate) {
        return await ProductModel.findByIdAndUpdate(id, productUpdate, { new: true });
    }

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default ProductDao;
