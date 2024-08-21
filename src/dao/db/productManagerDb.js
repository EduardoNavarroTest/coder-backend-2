
import ProductModel from "../fs/data/products.model.js";

class ProductManager {


    addProduct = async ({ title, description, code, price, stock, thumbnails, category }) => {

        const status = true;

        // Controlar que todos los campos existan
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            console.log(`All fields are required`);
            return;
        }

        const existsProduct = await ProductModel.findOne({ code: code });
        if (existsProduct) {
            console.log(`Existing code ${code}`);
            return;
        };

        //Agregar al array
        const newProduct = new ProductModel({ title, description, price, thumbnails, code, stock, status, category })

        await newProduct.save();
    }

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
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            let stringPrevLink = `/products?limit=${limit}&page=${page - 1}`;
            if (sort) {
                stringPrevLink += `&sort=${sort}`;
            }
            if (query) {
                stringPrevLink += `&query=${query}`;
            }

            let stringNextLink = `/products?limit=${limit}&page=${page + 1}`;
            if (sort) {
                stringNextLink += `&sort=${sort}`;
            }
            if (query) {
                stringNextLink += `&query=${query}`;
            }

            const prevLink = hasPrevPage ? stringPrevLink : null;
            const nextLink = hasNextPage ? stringNextLink : null;

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api${prevLink}` : null,
                nextLink: hasNextPage ? `/api${nextLink}` : null,
                prevLinkView: prevLink,
                nextLinkView: nextLink
            };
        } catch (e) {
            console.log("Error getting products", e);
            throw e;
        }
    }

    getProductById = async (id) => {
        const product = await ProductModel.findById(id);
        return product || `Not Found`;
    }

    updateProduct = async (id, productUpdate) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, productUpdate);

            if (!product) {
                console.log(`Product not found`);
                return null;
            } else {
                console.log(`Product update`)
            }
            return product
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    deleteProduct = async (id) => {
        try {
            const productDelete = await ProductModel.findByIdAndDelete(id);

            if (!productDelete) {
                console.log(`Product not found`);
                return null;
            } else {
                console.log(`Product delete`)
            }
            return productDelete
        } catch (e) {
            console.log("Error: ", e);
        }
    }

}

export default ProductManager;