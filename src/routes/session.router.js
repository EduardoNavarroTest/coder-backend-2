import { Router } from "express";
import UsuarioModel from "../models/user.models.js"
import { createHash, isValidPassword } from "../utils/utils.js"
import passport from "passport";
import jwt from "jsonwebtoken";
import CartManager from "../dao/db/cartManagerDb.js";

const JWT_SECRET = "coderhouse";

const cartManager = new CartManager();
const cart = await cartManager.createCart();

const router = Router();
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const existeUsuario = await UsuarioModel.findOne({ email });

        if (existeUsuario) {
            console.log("User already exists");
            return res.status(400).send("User already exists");
        }

        const nuevoUsuario = new UsuarioModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cart._id,
        });

        await nuevoUsuario.save();

        const token = jwt.sign({ email: nuevoUsuario.email, rol: nuevoUsuario.rol }, "coderhouse", { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true 
        })

        res.redirect("/api/sessions/current");

    } catch (error) {
        console.log("Internal Error Server ", error)
        res.status(500).send("Internal Error Server");
    }
})


//Login

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const usuarioEncontrado = await UsuarioModel.findOne({ email });
        console.log(email)
        
        if (!usuarioEncontrado) {
            return res.status(401).send("Invalid user");
        }

        if (!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign({ email: usuarioEncontrado.email, rol: usuarioEncontrado.rol }, "coderhouse", { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true 
        })

        res.redirect("/api/sessions/current");


    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error Server");
    }
})



router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user) {
        res.render("home", { email: req.user.email });
    } else {
        res.status(401).send("Unauthorized");
    }
})



router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
})


router.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.rol !== "admin") {
        return res.status(403).send("Unauthorized access");
    }
    res.render("admin");
})

export default router