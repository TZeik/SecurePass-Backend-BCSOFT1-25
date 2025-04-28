"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const visitSchema = new mongoose_1.default.Schema({
    residente: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombreVisitante: {
        type: String,
        required: true
    },
    documentoVisitante: {
        type: String,
        required: true
    },
    fechaAutorizacion: {
        type: Date,
        default: Date.now
    },
    fechaEntrada: {
        type: Date
    },
    fechaSalida: {
        type: Date
    },
    qrId: {
        type: String,
        unique: true
    },
    estado: {
        type: String,
        enum: ['autorizado', 'procesando', 'finalizado'],
        default: 'autorizado'
    },
    motivo: {
        type: String,
        required: true
    }
});
exports.Visit = mongoose_1.default.model('Visit', visitSchema);
