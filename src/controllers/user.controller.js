import userServices from "../services/user.services";
import jwt from "jsonwebtoken";

class UserController {
    async registerUser(req, res) {
        const { firstName, lastName, email, password, age } = req.body;
        try {
            const newUser = await userServices.registerUser({ firstName, lastName, email, password, age });

            const token = jwt.sign({
                user: `${newUser.firstName} ${newUser.lastName}`,
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
}