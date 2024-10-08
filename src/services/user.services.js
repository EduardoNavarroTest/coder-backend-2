import cartRepository from "../repositories/cart.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/utils.js";

class UserServices {
    async registerUser(userData) {
        const existUser = await UserRepository.getUserByEmail(userData.email);

        if (existUser) {
            throw new Error("User already exists");
        }


        //Crear y asignar carrito
        const newCart = await cartRepository.createCart();
        
        userData.cart = newCart._id;

        userData.password = createHash(userData.password);
        return await UserRepository.createUser(userData);

    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email);

        if (!user || !isValidPassword(password, user)) {
            throw new Error("Invalid user or password");
        }
        return user;
    }

}

export default new UserServices();