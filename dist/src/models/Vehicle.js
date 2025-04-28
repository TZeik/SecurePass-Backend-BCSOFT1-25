"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const mongoose_1 = require("mongoose");
const vehicleSchema = new mongoose_1.Schema({
    propietario: {
        type: String,
        required: true,
    },
    placa: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: [/^[A-Z]{1}-\d{6}$/, 'Formato de placa inválido (A-123456)']
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    imagenUrl: {
        type: String,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});
exports.Vehicle = (0, mongoose_1.model)("Vehicle", vehicleSchema);
