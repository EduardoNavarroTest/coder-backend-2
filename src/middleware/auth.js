// Crear middleware para proteger las rutas

export function soloAdmins(req, res, next) {
    if (req.user.rol === "admin") {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export function soloUsers(req, res, next) {
    if (req.user.rol === "user") {
        next(); // Continua la ejecución
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}