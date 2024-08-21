import express from "express";
import CartManager from "../dao/db/cartManagerDb.js";
const router = express.Router();

const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const carts = await cartManager.getCarts();

        limit ? res.json(carts.slice(0, limit)) : res.json(carts);
    } catch (e) {
        console.error("Error recovering the carts", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await cartManager.getCartById(id);
        res.json(cart?.products ? cart.products : `Not found`);
    } catch (e) {
        console.error("Error recovering the product", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.post("/", async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(201).json({
            message: "Cart successfully create",
        });
    } catch (e) {
        console.error("Error creating cart", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        await cartManager.addCart(cid, pid, quantity);
        res.status(201).json({
            message: "Product successfully added to cart",
        });
    } catch (e) {
        console.error("Error adding product to cart", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        await cartManager.removeProductCart(cid, pid);
        res.status(201).json({
            message: "Product remove successfully",
        });
    } catch (e) {
        console.error("Error remove product on cart", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body.products;
    console.log(products);
    try {
        await cartManager.updateProductsCart(cid, products); ////pppppppppendiebte
        res.status(201).json({
            message: "Products update successfully",
        });
    } catch (e) {
        console.error("Error update products on cart", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        await cartManager.updateQuantityProductCart(cid, pid, quantity);
        res.status(201).json({
            message: "Product update successfully",
        });
    } catch (e) {
        console.error("Error update quantity", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        await cartManager.cleanCart(cid);
        res.status(201).json({
            message: "Cart clean successfully",
        });
    } catch (e) {
        console.error("Error clean cart", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});

export default router;
