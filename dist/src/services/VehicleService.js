"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const Vehicle_1 = require("../models/Vehicle");
class VehicleService {
    // Registra un vehiculo para un propietario
    static async registerVehicle(vehicleData) {
        // Validacion del formato de placa
        // Placa en mayus
        vehicleData.placa = vehicleData.placa.toUpperCase();
        if (!/^[A-Z]{1}-\d{6}$/.test(vehicleData.placa)) {
            throw new Error("Formato de placa inválido (A-123456)");
        }
        return await Vehicle_1.Vehicle.create(vehicleData);
    }
    // Obtiene los vehiculos por ID
    static async getVehiclesById(ownerId) {
        return await Vehicle_1.Vehicle.find({ propietario: ownerId }).sort({
            fechaRegistro: -1,
        });
    }
    // Elimina vehiculo por placa
    static async deleteVehicle(placa) {
        await Vehicle_1.Vehicle.findOneAndDelete({ placa: placa.toUpperCase() });
    }
}
exports.VehicleService = VehicleService;
