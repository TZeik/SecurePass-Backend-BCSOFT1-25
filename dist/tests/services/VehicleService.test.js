"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VehicleService_1 = require("../../src/services/VehicleService");
const Vehicle_1 = require("../../src/models/Vehicle");
const IUser_1 = require("../../src/interfaces/IUser");
const VisitService_1 = require("../../src/services/VisitService");
const UserService_1 = require("../../src/services/UserService");
describe("VehicleService", () => {
    let residentId;
    let guardiaId;
    let visitId;
    it("Registro de un vehículo para residente", async () => {
        // Usuario residente de prueba
        const resident = await UserService_1.UserService.createUser({
            nombre: "Randy Germosén",
            email: "randy@example.com",
            password: "password123",
            role: IUser_1.UserRole.RESIDENTE,
            apartamento: "5",
            torre: "B",
        });
        residentId = resident._id;
        // Usuario guardia de prueba
        const guardia = await UserService_1.UserService.createUser({
            nombre: "Augusto Paniagua",
            email: "augusto@example.com",
            password: "password123",
            role: IUser_1.UserRole.GUARDIA,
        });
        guardiaId = guardia._id;
        const vehicle = await VehicleService_1.VehicleService.registerVehicle({
            propietario: residentId,
            placa: "A-345678",
            marca: "Honda",
            modelo: "Civic",
            color: "Rojo",
        });
        expect(vehicle._id).toBeDefined();
        expect(vehicle.placa).toBe("A-345678");
        expect(vehicle.propietario).toBe(residentId);
    });
    it("Registro de un vehículo para visita", async () => {
        const visit = await VisitService_1.VisitService.createVisit({
            residente: residentId,
            guardia: guardiaId,
            nombreVisitante: "Mar Cueva",
            documentoVisitante: "V-15975325",
            motivo: "Pasadia familiar",
        });
        visitId = visit._id;
        const vehicle = await VehicleService_1.VehicleService.registerVehicle({
            propietario: visitId,
            placa: "G-258014",
            marca: "Ford",
            modelo: "Focus",
            color: "Gris",
        });
        expect(vehicle._id).toBeDefined();
        expect(vehicle.placa).toBe("G-258014");
        expect(vehicle.propietario).toBe(visitId);
    });
    it("Verificación de formato de placa", async () => {
        const vehicle = await VehicleService_1.VehicleService.registerVehicle({
            propietario: residentId,
            placa: "a-987654", // Placa en lowercase
            marca: "Toyota",
            modelo: "Supra",
            color: "Amarillo",
        });
        expect(vehicle.placa).toBe("A-987654");
    });
    it("Formato de placa inválido", async () => {
        await expect(VehicleService_1.VehicleService.registerVehicle({
            propietario: residentId,
            placa: "ABCDEFGH-5", // Formato incorrecto
            marca: "Mazda",
            modelo: "CX-5",
            color: "Negro",
        })).rejects.toThrow("Formato de placa inválido (A-123456)");
    });
    it("Consulta de vehículos por residente", async () => {
        await VehicleService_1.VehicleService.registerVehicle({
            propietario: residentId,
            placa: "A-963852",
            marca: "Nissan",
            modelo: "Sentra",
            color: "Blanco",
        });
        const vehicles = await VehicleService_1.VehicleService.getVehiclesById(residentId);
        expect(vehicles.length).toBe(3); // El Civic, el Supra y el Sentra. (El CX-5 no porque su placa es inválida)
        expect(vehicles[0].placa).toBe("A-963852");
    });
    it("Eliminación de vehículo por placa", async () => {
        await VehicleService_1.VehicleService.registerVehicle({
            propietario: residentId,
            placa: "G-147000",
            marca: "Ford",
            modelo: "Fiesta",
            color: "Azul",
        });
        await VehicleService_1.VehicleService.deleteVehicle("G-147000");
        const vehicle = await Vehicle_1.Vehicle.findOne({ placa: "G-147000" });
        expect(vehicle).toBeNull();
    });
});
