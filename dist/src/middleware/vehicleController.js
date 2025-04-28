"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExit = exports.registerEntry = void 0;
const Visit_1 = __importDefault(require("../models/Visit")); // Asegúrate que importas bien Visit
// Registrar entrada
const registerEntry = async (req, res, next) => {
    var _a;
    try {
        const { placa } = req.params;
        const { imagenUrl } = (_a = req.body) === null || _a === void 0 ? void 0 : _a.imagenUrl; // Asegúrate de que la imagenUrl viene en el cuerpo de la solicitud
        if (!imagenUrl) {
            res.status(400).json({ message: 'La foto es requerida para registrar la entrada' });
            return;
        }
        const vehicle = await Visit_1.default.findOne({ placa });
        if (!vehicle) {
            res.status(404).json({ message: 'Vehículo no encontrado' });
            return;
        }
        vehicle.fechaEntrada = new Date();
        vehicle.imagenUrl = imagenUrl;
        await vehicle.save();
        res.status(200).json({ message: 'Entrada registrada con éxito', data: vehicle });
    }
    catch (error) {
        console.error('Error registrando entrada:', error);
        next(error);
    }
};
exports.registerEntry = registerEntry;
// Registrar salida
const registerExit = async (req, res, next) => {
    try {
        const { placa } = req.params;
        const { motivo } = req.body;
        if (!motivo) {
            res.status(400).json({ message: 'La nota es requerida para registrar la salida' });
            return;
        }
        const vehicle = await Visit_1.default.findOne({ placa });
        if (!vehicle) {
            res.status(404).json({ message: 'Vehículo no encontrado' });
            return;
        }
        vehicle.fechaSalida = new Date();
        vehicle.motivo = motivo;
        await vehicle.save();
        res.status(200).json({ message: 'Salida registrada con éxito', data: vehicle });
    }
    catch (error) {
        console.error('Error registrando salida:', error);
        next(error);
    }
};
exports.registerExit = registerExit;
