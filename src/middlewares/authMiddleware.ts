import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Headers:", req.headers);

  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(403).json({ error: "Encabezado de autorización no proporcionado." });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({ error: "Token no proporcionado." });
    return;
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("La clave secreta del JWT no está configurada.");
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    console.log("Token decodificado:", decoded);
    res.locals.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: "El token ha expirado." });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: "Token inválido." });
    } else {
      res.status(500).json({ error: "Error del servidor." });
    }
  }
};

