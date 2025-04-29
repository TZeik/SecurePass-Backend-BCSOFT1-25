import { Request, Response, NextFunction } from "express";

export const checkRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
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


