"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
const Visit_1 = require("../models/Visit");
const UserService_1 = require("./UserService");
class VisitService {
    static async createVisit(visitData) {
        const resident = await UserService_1.UserService.findById(visitData.residente);
        if (!resident)
            throw new Error("Residente no encontrado");
        return await Visit_1.Visit.create({
            ...visitData,
            qrId: this.generateQRId(),
            estado: "autorizado",
        });
    }
    // Actualiza una visita
    static async updateVisit(visitId, updateData) {
        if (updateData.guardia) {
            const guardia = await UserService_1.UserService.findById(updateData.guardia);
            if (!guardia || guardia.role !== "guardia") {
                throw new Error("Guardia no válido");
            }
        }
        return await Visit_1.Visit.findByIdAndUpdate(visitId, { ...updateData }, { new: true, runValidators: true });
    }
    // Registra una entrada
    static async registerEntry(visitId) {
        return await Visit_1.Visit.findByIdAndUpdate(visitId, {
            fechaEntrada: new Date(),
            estado: "procesando",
        }, { new: true });
    }
    // Obetener visitas por residente
    static async getVisitsByResident(residenteId) {
        return await Visit_1.Visit.find({ residente: residenteId }).sort({
            fechaAutorizacion: -1,
        });
    }
    // Obtener visitas por guardia
    static async getVisitsByGuard(guardId) {
        return await Visit_1.Visit.find({ guardia: guardId })
            .sort({ fechaEntrada: -1 })
            .populate("residente", "nombre apartamento");
    }
    static generateQRId() {
        return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
    }
    static async deleteVisit(visitId) {
        await Visit_1.Visit.findByIdAndDelete(visitId);
    }
}
exports.VisitService = VisitService;
