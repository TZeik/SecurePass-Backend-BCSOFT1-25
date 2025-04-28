"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
const Visit_1 = require("../models/Visit");
const UserService_1 = require("./UserService");
class VisitService {
    static async createVisit(visitData) {
        const resident = await UserService_1.UserService.findById(visitData.residente);
        if (!resident)
            throw new Error('Residente no encontrado');
        return await Visit_1.Visit.create({
            ...visitData,
            qrId: this.generateQRId(),
            estado: 'autorizado'
        });
    }
    // Registra una entrada
    static async registerEntry(visitId) {
        return await Visit_1.Visit.findByIdAndUpdate(visitId, {
            fechaEntrada: new Date(),
            estado: 'procesando'
        }, { new: true });
    }
    // Obetener visitas por residente
    static async getVisitsByResident(residenteId) {
        return await Visit_1.Visit.find({ residente: residenteId }).sort({ fechaAutorizacion: -1 });
    }
    static generateQRId() {
        return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
    }
}
exports.VisitService = VisitService;
