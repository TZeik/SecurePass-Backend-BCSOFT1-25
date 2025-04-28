import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { nombre, correo, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ nombre, correo, contraseña: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente." });
        return;
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario." });
        return;
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { correo, password } = req.body;

    try {
        
        const user = await User.findOne({ correo });
        if (!user) {
            res.status(401).json({ error: "Credenciales inválidas." });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Credenciales inválidas." });
            return;
        }

        const token = jwt.sign({ id: user._id, rol: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
        return;
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión." });
        return;
    }
};
