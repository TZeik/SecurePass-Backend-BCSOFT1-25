import { Request, Response, NextFunction } from 'express';
import Visit from '../models/Visit'; 
import { v4 as uuidv4 } from 'uuid'; // Importar la función para generar UUID

export const registerEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { residente, guardia, nombreVisitante, documentoVisitante, motivo, imagenUrl } = req.body;

        // Validar los campos requeridos
        if (!residente || !guardia || !nombreVisitante || !documentoVisitante || !motivo || !imagenUrl) {
            res.status(400).json({ message: 'Todos los campos son obligatorios para registrar la entrada' });
            return;
        }

        // Generar un valor único para qrId
        const qrId = uuidv4();

        // Crear un nuevo registro de visita
        const newVisit = new Visit({
            residente,
            guardia,
            nombreVisitante,
            documentoVisitante,
            fechaEntrada: new Date(), // Fecha y hora actuales
            motivo,
            imagenUrl,
            qrId, 
            estado: 'autorizado', 
            fechaAutorizacion: new Date(), 
        });

        // Guardar el registro en la base de datos
        await newVisit.save();

        res.status(201).json({ message: 'Entrada registrada con éxito', data: newVisit });
    } catch (error) {
        console.error('Error registrando entrada:', error);
        next(error); 
    }
};

// Registrar salida de visitas
export const registerExit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { placa } = req.params;
        const { motivo, guardia } = req.body; 

        if (!motivo || !guardia) {
            res.status(400).json({ message: 'El motivo y el guardia son requeridos para registrar la salida' });
            return;
        }

       
        const visit = await Visit.findOne({ placa });

        if (!visit) {
            res.status(404).json({ message: 'Visita no encontrada' });
            return;
        }

        
        visit.fechaSalida = new Date(); // Hora actual
        visit.motivo = motivo;
        visit.guardia = guardia;

       
        await visit.save();

       
        res.status(200).json({
            message: 'Salida registrada con éxito',
            data: {
                fechaEntrada: visit.fechaEntrada,
                fechaSalida: visit.fechaSalida,
                motivo: visit.motivo,
                guardia: visit.guardia,
                residente: visit.residente,
                nombreVisitante: visit.nombreVisitante,
                documentoVisitante: visit.documentoVisitante,
                imagenUrl: visit.imagenUrl,
                estado: visit.estado,
            },
        });
    } catch (error) {
        console.error('Error registrando salida:', error);
        next(error); // Pasar el error al middleware de manejo de errores
    }
};