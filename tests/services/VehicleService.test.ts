import { VehicleService } from "../../src/services/VehicleService";
import { Vehicle } from "../../src/models/Vehicle";
import { UserRole } from "../../src/interfaces/IUser";
import { VisitService } from "../../src/services/VisitService";
import { UserService } from "../../src/services/UserService";
import { Types } from "mongoose";

describe("VehicleService", () => {
  let residentId: Types.ObjectId;
  let guardiaId: Types.ObjectId;
  let visitId: Types.ObjectId;

  it("Registro de un vehículo para residente", async () => {
    // Usuario residente de prueba
    const resident = await UserService.createUser({
      nombre: "Randy Germosén",
      email: "randy@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "5",
      torre: "B",
    });

    residentId = resident._id as Types.ObjectId;

    // Usuario guardia de prueba
    const guardia = await UserService.createUser({
      nombre: "Augusto Paniagua",
      email: "augusto@example.com",
      password: "password123",
      role: UserRole.GUARDIA,
    });

    guardiaId = guardia._id as Types.ObjectId;

    const vehicle = await VehicleService.registerVehicle({
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
    const visit = await VisitService.createVisit({
      residente: residentId,
      guardia: guardiaId,
      nombreVisitante: "Mar Cueva",
      documentoVisitante: "V-15975325",
      motivo: "Pasadia familiar",
    });

    visitId = visit._id as Types.ObjectId;

    const vehicle = await VehicleService.registerVehicle({
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
    const vehicle = await VehicleService.registerVehicle({
      propietario: residentId,
      placa: "a-987654", // Placa en lowercase
      marca: "Toyota",
      modelo: "Supra",
      color: "Amarillo",
    });

    expect(vehicle.placa).toBe("A-987654");
  });

  it("Formato de placa inválido", async () => {
    await expect(
      VehicleService.registerVehicle({
        propietario: residentId,
        placa: "ABCDEFGH-5", // Formato incorrecto
        marca: "Mazda",
        modelo: "CX-5",
        color: "Negro",
      })
    ).rejects.toThrow("Formato de placa inválido (A-123456)");
  });

  it("Consulta de vehículos por residente", async () => {
    await VehicleService.registerVehicle({
      propietario: residentId,
      placa: "A-963852",
      marca: "Nissan",
      modelo: "Sentra",
      color: "Blanco",
    });

    const vehicles = await VehicleService.getVehiclesById(residentId);
    expect(vehicles.length).toBe(3); // El Civic, el Supra y el Sentra. (El CX-5 no porque su placa es inválida)
    expect(vehicles[0].placa).toBe("A-963852");
  });

  it("Eliminación de vehículo por placa", async () => {
    await VehicleService.registerVehicle({
      propietario: residentId,
      placa: "G-147000",
      marca: "Ford",
      modelo: "Fiesta",
      color: "Azul",
    });

    await VehicleService.deleteVehicle("G-147000");
    const vehicle = await Vehicle.findOne({ placa: "G-147000" });
    expect(vehicle).toBeNull();
  });
});
