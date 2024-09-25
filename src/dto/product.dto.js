class ProductDto {
    constructor({ _id, name, price, category, description, stock }) {
        this.id = _id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.stock = stock;
    }
}

export default ProductDto;