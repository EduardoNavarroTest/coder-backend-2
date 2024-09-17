import userServices from "../services/user.services.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {
    async registerUser(req, res) {
        const { first_name, last_name, email, password, age } = req.body;
        try {
            const newUser = await userServices.registerUser({ first_name, last_name, email, password, age });

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                rol: newUser.rol
            }, "coderhouse", { expiresIn: "1h" });
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            })
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userServices.loginUser(email, password);
            const token = jwt.sign({
                user: `${user.firstName} ${user.lastName}`,
                email: user.email,
                rol: user.rol
            }, "coderhouse", { expiresIn: "1h" });
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            })
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async current(req, res) {
        if (req.user) {
            const user = req.user;
            const userDTO = new UserDTO(user);
            res.render("home", { user: userDTO });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    }

    logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }
}

export default new UserController();