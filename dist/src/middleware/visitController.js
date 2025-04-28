"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExit = exports.registerEntry = void 0;
const Visit_1 = __importDefault(require("../models/Visit")); // Asegúrate que importas bien Visit
// Registrar entrada de visitas
// Registrar entrada de visitas
const registerEntry = async (req, res, next) => {
    try {
        const { placa } = req.params;
        const { imagenUrl, nombreVisitante } = req.body; // Obtenemos imagenUrl y nombre del cuerpo de la solicitud
        // Validación de los campos requeridos
        if (!imagenUrl) {
            res.status(400).json({ message: 'La foto es requerida para registrar la entrada' });
            return;
        }
        if (!nombreVisitante) {
            res.status(400).json({ message: 'El nombre del visitante es requerido' });
            return;
        }
        // Buscar la visita por placa
        const visit = await Visit_1.default.findOne({ placa });
        if (!visit) {
            res.status(404).json({ message: 'Visita no encontrada' });
            return;
        }
        // Actualizar los datos de la visita
        visit.fechaEntrada = new Date();
        visit.imagenUrl = imagenUrl;
        visit.nombreVisitante = nombreVisitante; // Asignamos el nombre del visitante
        // Guardar los cambios
        await visit.save();
        // Responder con el éxito de la operación
        res.status(200).json({ message: 'Entrada registrada con éxito', data: visit });
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
        const { placa } = req.params; // Identificador de la visita (puede ser la placa o un ID único)
        const { motivo } = req.body; // Nota enviada en el cuerpo de la solicitud
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
