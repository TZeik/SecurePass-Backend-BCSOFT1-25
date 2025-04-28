import { Request, Response, NextFunction } from 'express';
import Visit from '../models/Visit'; // Asegúrate que importas bien Visit
import User from '../models/User';


// Registrar entrada de visitas
export const registerEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { residente, nombreVisitante, documentoVisitante, motivo, imagenUrl } = req.body;

        // Validar los campos requeridos
        if (!residente || !nombreVisitante || !documentoVisitante || !motivo || !imagenUrl) {
            res.status(400).json({ message: 'Todos los campos son obligatorios para registrar la entrada' });
            return;
        }

        // Crear un nuevo registro de visita
        const newVisit = new Visit({
            residente,
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
    } catch (error) {
        console.error('Error registrando entrada:', error);
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Registrar salida de visitas
export const registerExit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { placa } = req.params; // Identificador de la visita (puede ser la placa o un ID único)
        const { motivo } = req.body; // Nota enviada en el cuerpo de la solicitud

        // Validar que la nota esté presente
        if (!motivo) {
            res.status(400).json({ message: 'La nota es requerida para registrar la salida' });
            return;
        }

        // Buscar la visita por placa o ID
        const visit = await Visit.findOne({ placa });

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
    } catch (error) {
        console.error('Error registrando salida:', error);
        next(error); // Pasar el error al middleware de manejo de errores
    }
};