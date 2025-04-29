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

  // Actualiza una visita

  static async updateVisit(
    visitId: string | Types.ObjectId,
    updateData: Partial<IVisitInput>
  ): Promise<IVisit | null> {
    if (updateData.guardia) {
      const guardia = await UserService.findById(updateData.guardia);
      if (!guardia || guardia.role !== "guardia") {
        throw new Error("Guardia no válido");
      }
    }

    return await Visit.findByIdAndUpdate(
      visitId,
      { ...updateData },
      { new: true, runValidators: true }
    );
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

  // Obtener visitas por guardia

  static async getVisitsByGuard(
    guardId: string | Types.ObjectId
  ): Promise<IVisit[]> {
    return await Visit.find({ guardia: guardId })
      .sort({ fechaEntrada: -1 })
      .populate("residente", "nombre apartamento");
  }

  private static generateQRId(): string {
    return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
  }

  static async deleteVisit(visitId: string | Types.ObjectId): Promise<void> {
    await Visit.findByIdAndDelete(visitId);
  }
}
