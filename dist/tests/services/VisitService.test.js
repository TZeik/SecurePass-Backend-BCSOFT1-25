"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VisitService_1 = require("../../src/services/VisitService");
const IUser_1 = require("../../src/interfaces/IUser");
const UserService_1 = require("../../src/services/UserService");
describe("VisitService", () => {
    let residentId;
    let guardiaId;
    it("Crear visita", async () => {
        // Usuario residente de prueba
        const resident = await UserService_1.UserService.createUser({
            nombre: "Gauris Javier",
            email: "gauris@example.com",
            password: "password123",
            role: IUser_1.UserRole.RESIDENTE,
            apartamento: "7",
            torre: "A",
        });
        residentId = resident._id;
        // Usuario guardia de prueba
        const guardia = await UserService_1.UserService.createUser({
            nombre: "Ernesto Papotico",
            email: "ernesto@example.com",
            password: "password123",
            role: IUser_1.UserRole.GUARDIA,
        });
        guardiaId = guardia._id;
        const visit = await VisitService_1.VisitService.createVisit({
            residente: residentId,
            guardia: guardiaId,
            nombreVisitante: "Rafael Tejada",
            documentoVisitante: "V-12345678",
            motivo: "Entrega de paquete",
        });
        expect(visit._id).toBeDefined();
        expect(visit.qrId).toMatch(/^qr-[a-z0-9]{8}-\d{13}$/);
        expect(visit.estado).toBe("autorizado");
    });
    it("Registrar entrada", async () => {
        const visit = await VisitService_1.VisitService.createVisit({
            residente: residentId,
            guardia: guardiaId,
            nombreVisitante: "Manuel Domínguez",
            documentoVisitante: "V-87654321",
            motivo: "Reunión",
        });
        const updatedVisit = await VisitService_1.VisitService.registerEntry(visit.id);
        expect(updatedVisit === null || updatedVisit === void 0 ? void 0 : updatedVisit.fechaEntrada).toBeInstanceOf(Date);
        expect(updatedVisit === null || updatedVisit === void 0 ? void 0 : updatedVisit.estado).toBe("procesando");
    });
    it("Consultar visitas por residente", async () => {
        await VisitService_1.VisitService.createVisit({
            residente: residentId,
            guardia: guardiaId,
            nombreVisitante: "Pedro Pascal",
            documentoVisitante: "V-11111111",
            motivo: "Visita familiar",
        });
        const visits = await VisitService_1.VisitService.getVisitsByResident(residentId);
        expect(visits.length).toBe(3);
        expect(visits[0].nombreVisitante).toBe("Pedro Pascal");
    });
});
