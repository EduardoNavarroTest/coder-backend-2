import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js"
import ProductManager from "./dao/db/productManagerDb.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import "./database.js";

const PORT = 8080;
const app = express();
const productManager = new ProductManager();

//Listener
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el http://localhost:${PORT}`);
});
const io = new Server(httpServer);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log("User conected...");
  const prueba = await productManager.getProducts();
  console.log(prueba);

  //Send products array
  socket.emit("productos", (await productManager.getProducts()).docs);

  //Eliminar productos desde el backend
  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);

    io.sockets.emit("productos", (await productManager.getProducts()).docs);
  });

  socket.on("agregarProducto", async (producto) => {
    await productManager.addProduct(producto);
    io.sockets.emit("productos", (await productManager.getProducts()).docs);
  });
});


//Voy por el minuto 39:55
