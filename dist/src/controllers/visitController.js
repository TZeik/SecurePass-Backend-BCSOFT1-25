"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExit = exports.registerEntry = void 0;
const Visit_1 = __importDefault(require("../models/Visit")); // Asegúrate que importas bien Visit
// Registrar entrada de visitas
const registerEntry = async (req, res, next) => {
    try {
        const { residente, guardia, nombreVisitante, documentoVisitante, motivo, imagenUrl } = req.body;
        // Validar los campos requeridos
        if (!residente || !guardia || !nombreVisitante || !documentoVisitante || !motivo || !imagenUrl) {
            res.status(400).json({ message: 'Todos los campos son obligatorios para registrar la entrada' });
            return;
        }
        // Crear un nuevo registro de visita
        const newVisit = new Visit_1.default({
            residente,
            guardia,
            nombreVisitante,
            documentoVisitante,
            fechaEntrada: new Date(), // Fecha y hora actuales
            motivo,
            imagenUrl,
            estado: 'autorizado', // Estado inicial
            fechaAutorizacion: new Date(), // Fecha de autorización
        });
        // Guardar el registro en la base de datos
        await newVisit.save();
        res.status(201).json({ message: 'Entrada registrada con éxito', data: newVisit });
    }
    catch (error) {
        console.error('Error registrando entrada:', error);
        next(error); // Pasar el error al middleware de manejo de errores
    }
};
exports.registerEntry = registerEntry;
// Registrar salida de visitas
const registerExit = async (req, res, next) => {
    try {
        const { placa } = req.params;
        const { motivo } = req.body;
        // Validar que la nota esté presente
        if (!motivo) {
            res.status(400).json({ message: 'La nota es requerida para registrar la salida' });
            return;
        }
        // Buscar la visita por placa o ID
        const visit = await Visit_1.default.findOne({ placa });
        if (!visit) {
            res.status(404).json({ message: 'Visita no encontrada' });
            return;
        }
        // Actualizar la fecha de salida y la nota
        visit.fechaSalida = new Date(); // Hora actual
        visit.motivo = motivo;
        // Guardar los cambios en la base de datos
        await visit.save();
        res.status(200).json({ message: 'Salida registrada con éxito', data: visit });
    }
    catch (error) {
        console.error('Error registrando salida:', error);
        next(error); // Pasar el error al middleware de manejo de errores
    }
};
exports.registerExit = registerExit;
