"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = res.locals.user;
        console.log("Usuario encontrado en res.locals:", user);
        if (!user || user.rol !== requiredRole) {
            res.status(403).json({ error: "Acceso denegado. Rol insuficiente." });
            return;
        }
        console.log("Rol válido. Procediendo...");
        next();
    };
};
exports.checkRole = checkRole;
