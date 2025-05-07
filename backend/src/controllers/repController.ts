import { Request, Response } from "express";
import { Visit } from "../models/Visit";
import mongoose, { Types } from "mongoose";


interface ResidentInfo {
  _id: Types.ObjectId;
  nombre?: string;
  apartamento?: string;
  torre?: string;
}



export const getVisitHistoryByResident = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { residenteId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(residenteId)) {
      res.status(400).json({ message: "ID de residente inválido" });
      return;
    }


    const visitas = await Visit.find({ residente: residenteId })
      .populate<{ residente: ResidentInfo }>(
        "residente",
        "nombre apartamento torre"
      )
      .populate("guardia", "nombre")
      .sort({ fechaEntrada: -1 })
      .lean();

    res.status(200).json(visitas);
  } catch (err) {
    console.error("Error obteniendo historial de visitas:", err);
    res.status(500).json({
      message: "Error al obtener el historial de visitas",
      error: err instanceof Error ? err.message : "Error desconocido",
    });
  }
};


