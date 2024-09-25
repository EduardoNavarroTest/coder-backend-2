import bcrypt from "bcrypt";

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const calculateTotal = (products) => {
    let total = 0;
    products.forEach((product) => {
        total += product.product.price * product.quantity;
    });
    return total;
}

export { createHash, isValidPassword, calculateTotal };