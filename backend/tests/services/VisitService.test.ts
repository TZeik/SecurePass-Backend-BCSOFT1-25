import { VisitService } from "../../src/services/VisitService";
import { UserRole } from "../../src/interfaces/IUser";
import { UserService } from "../../src/services/UserService";

describe("VisitService", () => {
  let residentId: string;
  let guardiaId: string;

  it("Crear visita", async () => {

    // Usuario residente de prueba
    const resident = await UserService.createUser({
      nombre: "Gauris Javier",
      email: "gauris@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "7",
      torre: "A",
    });

    residentId = resident.id.toString();

    // Usuario guardia de prueba
    const guardia = await UserService.createUser({
      nombre: "Ernesto Papotico",
      email: "ernesto@example.com",
      password: "password123",
      role: UserRole.GUARDIA,
    });

    guardiaId = guardia.id.toString();

    const visit = await VisitService.createVisit({
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
    const visit = await VisitService.createVisit({
      residente: residentId,
      guardia: guardiaId,
      nombreVisitante: "Manuel Domínguez",
      documentoVisitante: "V-87654321",
      motivo: "Reunión",
    });

    const updatedVisit = await VisitService.registerEntry(visit.id);

    expect(updatedVisit?.fechaEntrada).toBeInstanceOf(Date);
    expect(updatedVisit?.estado).toBe("procesando");
  });

  it("Consultar visitas por residente", async () => {
    await VisitService.createVisit({
      residente: residentId,
      guardia: guardiaId,
      nombreVisitante: "Pedro Pascal",
      documentoVisitante: "V-11111111",
      motivo: "Visita familiar",
    });

    const visits = await VisitService.getVisitsByResident(residentId);

    expect(visits.length).toBe(3);
    expect(visits[0].nombreVisitante).toBe("Pedro Pascal");
  });
});
