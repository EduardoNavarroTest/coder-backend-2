import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa a la DB"))
    .catch((error) => console.log("Error al conectarse a la base de datos: ", error));
