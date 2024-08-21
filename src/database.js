import mongoose from "mongoose";

mongoose.connect("mongodb+srv://eduardonavarrotest:coderhouse@cluster0.rmlvyfc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa a la DB"))
    .catch((error) => console.log("Error al conectarse a la base de datos: ", error));