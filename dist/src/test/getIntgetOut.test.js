"use strict";
// import request from 'supertest';
// import express, { Application } from 'express';
// import router from '../services/getIngetOut';
// import { Vehicle } from '../models/Vehicle';
// // Mock de Mongoose
// jest.mock('../models/Vehicle');
// const app: Application = express();
// app.use(express.json());
// app.use('/api', router);
// describe('Endpoints de Entrada y Salida de Vehículos', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     describe('PUT /vehicle/entrada/:placa', () => {
//         it('debería registrar la entrada de un vehículo con éxito', async () => {
//             const mockVehicle = {
//                 placa: 'ABC123',
//                 fechaEntrada: null,
//                 imagenUrl: null,
//                 save: jest.fn().mockResolvedValue({
//                     placa: 'ABC123',
//                     fechaEntrada: new Date(),
//                     imagenUrl: 'https://example.com/foto.jpg',
//                 }),
//             };
//             (Vehicle.findOne as jest.Mock).mockResolvedValue(mockVehicle);
//             const response = await request(app)
//                 .put('/api/vehicle/entrada/ABC123')
//                 .send({ imagenUrl: 'https://example.com/foto.jpg' });
//             expect(response.status).toBe(200);
//             expect(response.body.message).toBe('Entrada registrada con éxito');
//             expect(response.body.data.imagenUrl).toBe('https://example.com/foto.jpg');
//             expect(mockVehicle.save).toHaveBeenCalled();
//         });
//         it('debería devolver un error si no se proporciona la foto', async () => {
//             const response = await request(app)
//                 .put('/api/vehicle/entrada/ABC123')
//                 .send({});
//             expect(response.status).toBe(400);
//             expect(response.body.message).toBe('La foto es requerida para registrar la entrada');
//         });
//         it('debería devolver un error si el vehículo no existe', async () => {
//             (Vehicle.findOne as jest.Mock).mockResolvedValue(null);
//             const response = await request(app)
//                 .put('/api/vehicle/entrada/ABC123')
//                 .send({ imagenUrl: 'https://example.com/foto.jpg' });
//             expect(response.status).toBe(404);
//             expect(response.body.message).toBe('Vehículo no encontrado');
//         });
//     });
//     describe('PUT /vehicle/salida/:placa', () => {
//         it('debería registrar la salida de un vehículo con éxito', async () => {
//             const mockVehicle = {
//                 placa: 'ABC123',
//                 fechaSalida: null,
//                 motivo: null,
//                 save: jest.fn().mockResolvedValue({
//                     placa: 'ABC123',
//                     fechaSalida: new Date(),
//                     motivo: 'Salida sin inconvenientes',
//                 }),
//             };
//             (Vehicle.findOne as jest.Mock).mockResolvedValue(mockVehicle);
//             const response = await request(app)
//                 .put('/api/vehicle/salida/ABC123')
//                 .send({ motivo: 'Salida sin inconvenientes' });
//             expect(response.status).toBe(200);
//             expect(response.body.message).toBe('Salida registrada con éxito');
//             expect(response.body.data.motivo).toBe('Salida sin inconvenientes');
//             expect(mockVehicle.save).toHaveBeenCalled();
//         });
//         it('debería devolver un error si no se proporciona la nota', async () => {
//             const response = await request(app)
//                 .put('/api/vehicle/salida/ABC123')
//                 .send({});
//             expect(response.status).toBe(400);
//             expect(response.body.message).toBe('La nota es requerida para registrar la salida');
//         });
//         it('debería devolver un error si el vehículo no existe', async () => {
//             (Vehicle.findOne as jest.Mock).mockResolvedValue(null);
//             const response = await request(app)
//                 .put('/api/vehicle/salida/ABC123')
//                 .send({ motivo: 'Salida sin inconvenientes' });
//             expect(response.status).toBe(404);
//             expect(response.body.message).toBe('Vehículo no encontrado');
//         });
//     });
// });
