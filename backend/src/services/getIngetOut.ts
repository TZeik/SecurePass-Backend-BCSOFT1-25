// import  { Request, Response } from 'express';
// import { Vehicle, } from '../models/Vehicle'; // Importa el modelo correcto


// const express = require('express');
// const router = express.Router();

// // Endpoint para registrar la entrada
// router.put('/vehicle/entrada/:placa', async (req: Request, res: Response) => {
//     try {
//         const { placa } = req.params;
//         const { imagenUrl } = req.body;

//         // Validar que la foto esté presente
//         if (!imagenUrl) {
//             return res.status(400).json({ message: 'La foto es requerida para registrar la entrada' });
//         }

//         // Buscar el vehículo por placa
//         const vehicle = await Vehicle.findOne({ placa });
//         if (!vehicle) {
//             return res.status(404).json({ message: `Vehículo con placa ${placa} no encontrado` });
//         }

//         // Actualizar la fecha de entrada y la foto
//         vehicle.fechaEntrada = new Date();
//         vehicle.imagenUrl = imagenUrl;

//         // Guardar los cambios en la base de datos
//         const updatedVehicle = await vehicle.save();

//         res.status(200).json({ message: 'Entrada registrada con éxito', data: updatedVehicle });
//     } catch (error) {
//         console.error('Error al registrar la entrada:', error);
//         res.status(500).json({ message: 'Error del servidor al registrar la entrada' });
//     }
// });

// // Endpoint para registrar la salida
// router.put('/vehicle/salida/:placa', async (req: Request, res: Response) => {
//     try {
//         const { placa } = req.params;
//         const { motivo } = req.body;

//         // Validar que la nota esté presente
//         if (!motivo) {
//             return res.status(400).json({ message: 'La nota es requerida para registrar la salida' });
//         }

//         // Buscar el vehículo por placa
//         const vehicle = await Vehicle.findOne({ placa });
//         if (!vehicle) {
//             return res.status(404).json({ message: `Vehículo con placa ${placa} no encontrado` });
//         }

//         // Actualizar la fecha de salida y la nota
//         vehicle.fechaSalida = new Date();
//         vehicle.motivo = motivo;

//         // Guardar los cambios en la base de datos
//         const updatedVehicle = await vehicle.save();

//         res.status(200).json({ message: 'Salida registrada con éxito', data: updatedVehicle });
//     } catch (error) {
//         console.error('Error al registrar la salida:', error);
//         res.status(500).json({ message: 'Error del servidor al registrar la salida' });
//     }
// });

// export default router;