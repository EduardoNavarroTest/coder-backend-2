const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
});

const renderProductos = (data) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    data.forEach(element => {
        const card = document.createElement("div");

        card.innerHTML = `<div class="card">
                <p> Id: <strong>${element._id}</strong></p>
                <p> Product: <strong>${element.title}</strong></p>
                <p> Price: <strong>$${element.price}</strong></p>
                <button>Delete</button>
            </div>
        `

        contenedorProductos.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            deleteProducts(element._id);
            console.log(" hoa " + element._id)
        })
    });

}

const deleteProducts = (id) => {
    socket.emit("eliminarProducto", id);
};

document.getElementById("btnSend").addEventListener("click", () => {
    addProduct();
});

const addProduct = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnails: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    }

    socket.emit("agregarProducto", producto);
}