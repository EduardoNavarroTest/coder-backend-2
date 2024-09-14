import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/utils.js";

class UserServices {
    async registerUser(userData) {
        const existUser = await userRepository.getUserByEmail(userData.email);

        if (existUser) {
            throw new Error("User already exists");
        }

        userData.isValidPassword = createHash(userData.password);
        return await userRepository.createUser(userData);

    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);

        if (!user || !isValidPassword(password, user)) {
            throw new Error("Invalid user or password");
        }
        return user;
    }

}

export default new UserServices();