import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../interfaces/IToken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(403).json({ error: "Encabezado de autorización no proporcionado o incorrecto." });
            return;
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            res.status(403).json({ error: "Token no proporcionado." });
            return;
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error("Error: La clave secreta del JWT no está configurada.");
            res.status(500).json({ error: "Configuración de seguridad incorrecta." });
            return;
        }

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        res.locals.user = decoded;

        console.log("Token decodificado:", decoded);
        next();
    } catch (error: unknown) {
        console.error("Error al verificar token:", error);

        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ error: "El token ha expirado." });
                return;
            } else if (error.name === "JsonWebTokenError") {
                res.status(401).json({ error: "Token inválido." });
                return;
            } else {
                res.status(500).json({ error: "Error del servidor.", details: error.message });
                return;
            }
        }

        res.status(500).json({ error: "Error inesperado en autenticación." });
        return;
    }
};



