import { Router } from "express";
import ProductManager from "../dao/db/productManagerDb.js"
import CartManager from "../dao/db/cartManagerDb.js";
import { soloAdmins, soloUsers } from "../middleware/auth.js";
import passport from "passport";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }), soloAdmins, async (req, res) => {
   res.render("realtimeproducts");
});

router.get("/home", async (req, res) => {
   try {
      const products = await productManager.getProducts();
      res.render("home", { products });
   } catch (e) {
      console.log(`Error => ${e}`);
      res.status(500).send(`Error when recovering products => ${e}`);
   }
})

router.get("/products", passport.authenticate("jwt", { session: false }), soloUsers, async (req, res) => {
   try {
      const { limit = 10, page = 1, query, sort } = req.query;
      const productos = await productManager.getProducts({
         limit: parseInt(limit),
         page: parseInt(page),
         sort,
         query,
      });

      console.log(req.query)

      const nuevoArray = productos.docs.map(producto => {
         const { _id, ...rest } = producto.toObject();
         return rest;
      });

      console.log({
         productos: nuevoArray,
         hasPrevPage: productos.hasPrevPage,
         hasNextPage: productos.hasNextPage,
         prevPage: productos.prevPage,
         nextPage: productos.nextPage,
         currentPage: productos.page,
         totalPages: productos.totalPages,
         prevLinkView: productos.prevLinkView,
         nextLinkView: productos.nextLinkView
      })

      res.render("products", {
         productos: nuevoArray,
         hasPrevPage: productos.hasPrevPage,
         hasNextPage: productos.hasNextPage,
         prevPage: productos.prevPage,
         nextPage: productos.nextPage,
         currentPage: productos.page,
         totalPages: productos.totalPages,
         prevLinkView: productos.prevLinkView,
         nextLinkView: productos.nextLinkView
      });

   } catch (error) {
      console.error("Error getting products", error);
      res.status(500).json({
         status: 'error',
         error: "Internal error server"
      });
   }
});

router.get("/carts/:cid", async (req, res) => {
   const cartId = req.params.cid;

   try {
      const cart = await cartManager.getCartById(cartId);

      console.log(cart)

      if (!cart) {
         console.log("Cart not found");
         return res.status(404).json({ error: "Cart not found" });
      }

      const productsInCart = cart.products.map(item => ({
         product: item.product.toObject(),
         quantity: item.quantity
      }));


      res.render("carts", { products: productsInCart });
   } catch (error) {
      console.error("Error getting cart", error);
      res.status(500).json({ error: "Internal Error Server" });
   }
});

router.get("/login", (req, res) => {
   res.render("login")
});

router.get("/register", (req, res) => {
   res.render("register")
});


export default router;