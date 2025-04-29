"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const registerUser = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.User({ nombre, correo, contraseña: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado exitosamente." });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario." });
        return;
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await User_1.User.findOne({ correo });
        if (!user) {
            res.status(401).json({ error: "Credenciales inválidas." });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Credenciales inválidas." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, rol: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión." });
        return;
    }
};
exports.loginUser = loginUser;
