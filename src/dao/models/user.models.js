import mongoose from "mongoose";
import CartManager from "../db/cartManagerDb.js";

const cartManager = new CartManager();

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    },
    rol: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    /*cartId: cartManager.createCart()*/
})

const UsuarioModel = mongoose.model("users", schema);

export default UsuarioModel; 