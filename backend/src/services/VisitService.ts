import { Visit } from "../models/Visit";
import { IVisit, IVisitInput } from "../interfaces/IVisit";
import { Types } from "mongoose";
import { UserService } from "./UserService";

export class VisitService {
  static async createVisit(visitData: IVisitInput): Promise<IVisit> {
    const resident = await UserService.findById(visitData.residente);
    if (!resident) throw new Error("Residente no encontrado");

    return await Visit.create({
      ...visitData,
      qrId: this.generateQRId(),
      estado: "autorizado",
    });
  }

  // Registra una entrada

  static async registerEntry(
    visitId: string | Types.ObjectId
  ): Promise<IVisit | null> {
    return await Visit.findByIdAndUpdate(
      visitId,
      {
        fechaEntrada: new Date(),
        estado: "procesando",
      },
      { new: true }
    );
  }

  // Obetener visitas por residente

  static async getVisitsByResident(
    residenteId: string | Types.ObjectId
  ): Promise<IVisit[]> {
    return await Visit.find({ residente: residenteId }).sort({
      fechaAutorizacion: -1,
    });
  }

  private static generateQRId(): string {
    return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
  }
}
