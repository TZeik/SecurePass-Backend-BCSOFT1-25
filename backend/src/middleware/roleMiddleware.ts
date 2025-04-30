import { Request, Response, NextFunction } from "express";

export const checkRole = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;
        console.log("Usuario encontrado en res.locals:", user);

        if (!user || !requiredRoles.includes(user.role)) {
            console.warn(`Acceso denegado para usuario con rol: ${user?.role}`);
            return res.status(403).json({ error: "Acceso denegado. Rol insuficiente." });
        }

        console.log("Rol válido. Procediendo...");
        next();
    };
};



