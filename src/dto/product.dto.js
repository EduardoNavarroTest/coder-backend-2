class ProductDto {
    constructor({ _id, title, description, price, stock, category }) {
        this.id = _id;           // _id de Mongoose
        this.title = title;      // Cambiar name por title
        this.description = description; // Propiedad correcta
        this.price = price;      // Propiedad correcta
        this.stock = stock;      // Propiedad correcta
        this.category = category; // Propiedad correcta
    }
}

export default ProductDto;
