
class CartDto {
    constructor({ _id, products }) {
        this.id = _id;
        this.products = products.map(product => ({
            productId: product.product._id,
            quantity: product.quantity
        }));
    }
}

export default CartDto