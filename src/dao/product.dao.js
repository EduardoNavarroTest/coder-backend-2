import ProductModel from "./models/products.model.js";

class ProductDao {
    getProducts = async ({ limit = 10, page = 1, sort, query } = {}) => {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .lean(); // Utilizando lean() para obtener objetos simples

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            const totalPages = Math.ceil(totalProducts / limit);

            // Cálculo de los valores de paginación
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            // Generar enlaces de paginación (prevLink y nextLink)
            let stringPrevLink = `/products?limit=${limit}&page=${page - 1}`;
            let stringNextLink = `/products?limit=${limit}&page=${page + 1}`;
            
            // Añadir sort y query a los links de paginación si existen
            if (sort) {
                stringPrevLink += `&sort=${sort}`;
                stringNextLink += `&sort=${sort}`;
            }
            if (query) {
                stringPrevLink += `&query=${query}`;
                stringNextLink += `&query=${query}`;
            }

            const prevLink = hasPrevPage ? `/api${stringPrevLink}` : null;
            const nextLink = hasNextPage ? `/api${stringNextLink}` : null;

            const payload = {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: prevLink,     // URL para la página anterior
                nextLink: nextLink,     // URL para la página siguiente
                prevLinkView: prevLink, // Link visual
                nextLinkView: nextLink  // Link visual
            };
            console.log("Payload:", payload.docs);
            return payload;
        } catch (e) {
            console.log("Error getting products", e);
            throw e;
        }
    }
    
    

    async getProductById(id) {
        return await ProductModel.findById(id);
    }

    async addProduct(product) {

        
        const existsProduct = await ProductModel.findOne({ code: product.code });
        if (existsProduct) {
            console.log(`Existing code ${product.code}`);
            return { success: false, message: `Existing code ${product.code}` };
        };

        const newProduct = new ProductModel(product);
        await newProduct.save();
        return { success: true, message: "Product successfully added", product: newProduct };
    }

    async updateProduct(id, productUpdate) {
        return await ProductModel.findByIdAndUpdate(id, productUpdate, { new: true });
    }

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default ProductDao;
