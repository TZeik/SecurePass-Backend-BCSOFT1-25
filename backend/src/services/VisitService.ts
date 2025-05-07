import { Visit } from "../models/Visit";
import { IVisit, IVisitInput } from "../interfaces/IVisit";
import { Types } from "mongoose";
import { UserService } from "./UserService";

export class VisitService {
  static validateResident: any;
  static findById(visitData: IVisitInput) {
    throw new Error("Method not implemented.");
  }
  static async createVisit(visitData: IVisitInput): Promise<IVisit> {
    const resident = await UserService.findById(visitData.residente);
    const guard = await UserService.findById(visitData.guardia);
    if (!resident) throw new Error("Residente no encontrado");
    if(!guard) throw new Error('Guardia no encontrado');

    return await Visit.create({
      ...visitData,
      qrId: this.generateQRId(),
      fechaEntrada: new Date(),
      estado: "autorizado",
    });
  }

  // Actualiza una visita

  static async updateVisit(
    visitId: string | Types.ObjectId,
    updateData: Partial<IVisitInput> | Partial<IVisit>
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

  // Registra una salida

  static async registerExit(
    qrId: string
  ): Promise<IVisit | null> {

    const visit = await this.getVisitByQR(qrId) as IVisit;

    return await Visit.findByIdAndUpdate(
      visit._id,
      {
        fechaSalida: new Date(),
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

  static async deleteVisit(visitId: string | Types.ObjectId): Promise<void> {
    await Visit.findByIdAndDelete(visitId);
  }

  static async getAllVisits(): Promise<IVisit[]> {
    return await Visit.find()
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre")
      .sort({ fechaAutorizacion: -1 });
  }
  
  static async getVisitById(visitId: string | Types.ObjectId): Promise<IVisit | null> {
    return await Visit.findById(visitId)
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre");
  }
  
  static async getVisitByQR(qrId: string): Promise<IVisit | null> {
    return await Visit.findOne({ qrId })
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre");
  }

  private static generateQRId(): string {
    return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
  }
  
}
