import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ nombre, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente." });
        return;
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario." });
        return;
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;

    try {
        const cleanEmail = email?.trim();
        const cleanPassword = password?.trim();

        if (!cleanEmail || !cleanPassword) {
            return res.status(400).json({ error: "Email y contraseña son requeridos." });
        }

        const user = await User.findOne({ email: cleanEmail });
        if (!user) {
            console.warn(`Intento de acceso con email no registrado: ${cleanEmail}`);
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        
        const isPasswordValid = await bcrypt.compare(cleanPassword, user.password);
        if (!isPasswordValid) {
            console.warn(`Intento de acceso fallido para usuario: ${cleanEmail}`);
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h", algorithm: "HS256" }
        );

        return res.status(200).json({ token, user: { id: user._id, role: user.role, email: user.email } });
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Error al iniciar sesión:", err.message);
        return res.status(500).json({ error: "Error interno en autenticación.", details: err.message });
    }

};

