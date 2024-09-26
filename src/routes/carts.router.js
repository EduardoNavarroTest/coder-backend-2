import express from "express";
import CartController from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", CartController.createCart);
router.get("/", CartController.getAllCarts);
router.get("/:cid", CartController.getCartById);
router.post("/:cid/product/:pid", CartController.addProductToCart);
router.delete("/:cid/product/:pid", CartController.removeProductFromCart);
router.delete("/:cid", CartController.cleanCart);
router.get("/:cid/purchase", CartController.purchase); 
router.put("/:cid", CartController.updateProductsCart); 
router.put("/:cid/product/:pid", CartController.updateQuantityProductCart); 

export default router;


/*import express from "express";
import CartManager from "../dao/db/cartManagerDb.js";
import CartModel from "../dao/models/cart.model.js";
import UsuarioModel from "../dao/models/user.models.js";
import ProductModel from "../dao/models/products.model.js";
import TicketModel from "../dao/models/tickets.model.js";
import { calculateTotal } from "../utils/utils.js";
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

router.get("/:cid/purchase", async (req, res) => {
    const cid = req.params.cid;
      try {
        const cart = await CartModel.findById(cid);
        const arrProducts = cart.products;
        const productsNotAvailable = [];

        for (const item of arrProducts) {
            const productId = item.product;
            const product = await ProductModel.findById(productId);
            if (product.stock > item.quantity) {
                product.stock -= item.quantity;
                await product.save();
            } else {
                productsNotAvailable.push(productId);
            }
        }

        const userCart = await UsuarioModel.findOne({ cart: cid });
        console.log(cart.products);
        const ticket = new TicketModel({
            purchase_datetime: new Date(),
            amount: calculateTotal(cart.products),
            purchaser: userCart.email,
        })
        await ticket.save(),

            cart.products = cart.products.filter(
                item => productsNotAvailable.some(productId => productId.equals(item.product))
            );
        await cart.save();

        res.json({
            message: "Purchase successfully",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser
            },
            productsNotAvailable
        });


    } catch (e) {
        console.error("Error creating ticket", e);
        res.status(500).json({
            e: "Server Error",
        });
    }
});


export default router;
*/