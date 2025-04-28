"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VehicleService_1 = require("../services/VehicleService");
const Vehicle_1 = require("../models/Vehicle");
const User_1 = require("../models/User");
const IUser_1 = require("../interfaces/IUser");
describe("VehicleService", () => {
    let residentId;
    it("Registro de un vehículo", async () => {
        // Usuario residente de prueba
        const resident = await User_1.User.create({
            nombre: "Randy Germosén",
            email: "randy@example.com",
            password: "password123",
            role: IUser_1.UserRole.RESIDENTE,
            apartamento: "5",
            torre: "B",
        });
        residentId = resident.id.toString();
        const vehicle = await VehicleService_1.VehicleService.registerVehicle({
            residente: residentId,
            placa: "A-345678",
            marca: "Honda",
            modelo: "Civic",
            color: "Rojo",
        });
        expect(vehicle._id).toBeDefined();
        expect(vehicle.placa).toBe("A-345678");
        expect(vehicle.residente.toString()).toBe(residentId);
    });
    it("Verificación de formato de placa", async () => {
        const vehicle = await VehicleService_1.VehicleService.registerVehicle({
            residente: residentId,
            placa: "a-987654", // Placa en lowercase
            marca: "Toyota",
            modelo: "Supra",
            color: "Amarillo",
        });
        expect(vehicle.placa).toBe("A-987654");
    });
    it("Formato de placa inválido", async () => {
        await expect(VehicleService_1.VehicleService.registerVehicle({
            residente: residentId,
            placa: "ABCDEFGH-5", // Formato incorrecto
            marca: "Mazda",
            modelo: "CX-5",
            color: "Negro",
        })).rejects.toThrow("Formato de placa inválido (A-123456)");
    });
    it("Consulta de vehículos por residente", async () => {
        await VehicleService_1.VehicleService.registerVehicle({
            residente: residentId,
            placa: "A-963852",
            marca: "Nissan",
            modelo: "Sentra",
            color: "Blanco",
        });
        const vehicles = await VehicleService_1.VehicleService.getVehiclesByResident(residentId);
        expect(vehicles.length).toBe(3); // El Civic, el Supra y el Sentra. (El CX-5 no porque su placa es inválida)
        expect(vehicles[0].placa).toBe("A-963852");
    });
    it("Eliminación de vehículo por placa", async () => {
        await VehicleService_1.VehicleService.registerVehicle({
            residente: residentId,
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
