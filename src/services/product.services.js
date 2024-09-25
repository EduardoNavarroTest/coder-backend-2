import productRepository from "../repositories/product.repository.js";
import ProductDto from "../dto/product.dto.js";


class ProductService {
    async getProducts(query) {
        const products = await productRepository.getAllProducts(query);
        return products.docs.map(product => new ProductDto(product));
    }

    async getProductById(id) {
        const product = await productRepository.getProductById(id);
        return new ProductDto(product);
    }

    async addProduct(productData) {
        return await productRepository.createProduct(productData);
    }

    async updateProduct(id, productUpdate) {
        return await productRepository.updateProduct(id, productUpdate);
    }

    async deleteProduct(id) {
        return await productRepository.deleteProduct(id);
    }
}

export default new ProductService();