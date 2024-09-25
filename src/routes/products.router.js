import { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;

/*


import express from "express";
import ProductManager from "../dao/db/productManagerDb.js";
const router = express.Router();


const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const productos = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });


        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.prevLink,
            nextLink: productos.nextLink
        });

    } catch (e) {
        console.error("Error recovering the products", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.getProductById(id);
        res.json(product);
    } catch (e) {
        console.error("Error recovering the product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({
            message: "Product successfully added"
        });
    } catch (e) {
        console.error("Error adding product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productUpdate = req.body;

    try {
        await productManager.updateProduct(id, productUpdate);
        res.json({
            message: "Product successfully update"
        });
    } catch (e) {
        console.error("Error update product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Product successfully delete"
        });
    } catch (e) {
        console.error("Error delete product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});

export default router;
*/