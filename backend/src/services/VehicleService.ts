import { Vehicle } from "../models/Vehicle";
import { IVehicle, IVehicleInput } from "../interfaces/IVehicle";
import { Types } from "mongoose";

export class VehicleService {
  // Registra un vehiculo para un propietario
  static async registerVehicle(vehicleData: IVehicleInput): Promise<IVehicle> {
    // Validacion del formato de placa

    // Placa en mayus
    vehicleData.placa = vehicleData.placa.toUpperCase();

    if (!/^[A-Z]{1}-\d{6}$/.test(vehicleData.placa)) {
      throw new Error("Formato de placa inválido (A-123456)");
    }

    return await Vehicle.create(vehicleData);
  }

  // Obtiene los vehiculos por ID
  static async getVehiclesById(ownerId: string | Types.ObjectId): Promise<IVehicle[]> {
    return await Vehicle.find({ propietario: ownerId }).sort({
      fechaRegistro: -1,
    });
  }

  // Elimina vehiculo por placa
  static async deleteVehicle(placa: string): Promise<void> {
    await Vehicle.findOneAndDelete({ placa: placa.toUpperCase() });
  }
}
