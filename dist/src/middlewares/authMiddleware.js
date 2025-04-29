"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    console.log("Headers:", req.headers);
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(403).json({ error: "Encabezado de autorización no proporcionado." });
        return;
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).json({ error: "Token no proporcionado." });
        return;
    }
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("La clave secreta del JWT no está configurada.");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log("Token decodificado:", decoded);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: "El token ha expirado." });
        }
        else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: "Token inválido." });
        }
        else {
            res.status(500).json({ error: "Error del servidor." });
        }
    }
};
exports.verifyToken = verifyToken;
