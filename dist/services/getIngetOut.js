"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Visit_1 = require("../models/Visit");
const express = require('express');
const router = express.Router();
// Endpoint para registrar la entrada
router.put('/visit/entrada/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { foto } = req.body; // Foto enviada en el cuerpo de la solicitud
        // Validar que la foto esté presente
        if (!foto) {
            return res.status(400).json({ message: 'La foto es requerida para registrar la entrada' });
        }
        // Buscar la visita por ID y actualizar la fecha de entrada y la foto
        const visit = await Visit_1.Visit.findByIdAndUpdate(id, { fechaEntrada: new Date(), estado: 'procesando', foto }, { new: true });
        if (!visit) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json({ message: 'Entrada registrada con éxito', data: visit });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
// Endpoint para registrar la salida
router.put('/visit/salida/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nota } = req.body; // Nota enviada en el cuerpo de la solicitud
        // Validar que la nota esté presente
        if (!nota) {
            return res.status(400).json({ message: 'La nota es requerida para registrar la salida' });
        }
        // Buscar la visita por ID y actualizar la fecha de salida y la nota
        const visit = await Visit_1.Visit.findByIdAndUpdate(id, { fechaSalida: new Date(), estado: 'finalizado', nota }, { new: true });
        if (!visit) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json({ message: 'Salida registrada con éxito', data: visit });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.default = router;
