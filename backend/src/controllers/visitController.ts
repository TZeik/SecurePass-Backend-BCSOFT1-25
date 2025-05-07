import { Request, Response, NextFunction } from "express";
import { VisitService } from "../services/VisitService";
import { IVisit, IVisitInput } from "../interfaces/IVisit";
import Visit from "../models/Visit";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export const registerEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { residente, guardia, nombreVisitante, documentoVisitante, motivo, imagenUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(residente)) {
      res.status(400).json({ message: "ID de residente inválido" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(guardia)) {
      res.status(400).json({ message: "ID de guardia inválido" });
      return;
    }

    const newVisit = await Visit.create({
      residente,
      guardia,
      nombreVisitante,
      documentoVisitante,
      motivo,
      imagenUrl,
      qrid:uuidv4(),
    });

    res.status(201).json({ message: "Visita registrada con éxito", data: newVisit });
  } catch (error) {
    console.error("Error registrando entrada:", error);
    next(error);
  }
};
export const registerExit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { qrId } = req.params;
    const visit = await VisitService.registerExit(qrId);
    if (!visit) {
      res.status(404).json({ message: "Visita no encontrada" });
      return;
    }
    res.status(200).json({ message: "Salida registrada con éxito", data: visit });
  } catch (error) {
    console.error("Error registrando salida:", error);
    next(error);
  }
};

export const getAllVisits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const visits = await Visit.find()
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre")
      .sort({ fechaAutorizacion: -1 });
    res.status(200).json(visits);
  } catch (error) {
    next(error);
  }
};

export const getVisitById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const visit = await Visit.findById(id)
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre");
    
    if (!visit) {
      res.status(404).json({ message: "Visita no encontrada" });
      return;
    }
    res.status(200).json(visit);
  } catch (error) {
    next(error);
  }
};

export const getVisitByQR = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { qrId } = req.params;
    const visit = await Visit.findOne({ qrId })
      .populate("residente", "nombre apartamento")
      .populate("guardia", "nombre");
    
    if (!visit) {
      res.status(404).json({ message: "Visita no encontrada" });
      return;
    }
    res.status(200).json(visit);
  } catch (error) {
    next(error);
  }
};

export const updateVisitStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { estado } = req.query;

    const updateData = {estado: estado?.toString() };
    const updatedVisit = await VisitService.updateVisit(id, updateData as Partial<IVisit>);
    
    if (!updatedVisit) {
      res.status(404).json({ message: "Visita no encontrada" });
      return;
    }
    
    res.status(200).json({ message: "Estado actualizado", data: updatedVisit });
  } catch (error) {
    next(error);
  }
};

export const updateVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedVisit = await VisitService.updateVisit(id, updateData);
    
    if (!updatedVisit) {
      res.status(404).json({ message: "Visita no encontrada" });
      return;
    }
    
    res.status(200).json({ message: "Visita actualizada", data: updatedVisit });
  } catch (error) {
    next(error);
  }
};

export const deleteVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await VisitService.deleteVisit(id);
    res.status(200).json({ message: "Visita eliminada con éxito" });
  } catch (error) {
    next(error);
  }
};

export const getVisitsByResident = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { residenteId } = req.params;
    const visits = await VisitService.getVisitsByResident(residenteId);
    res.status(200).json(visits);
  } catch (error) {
    next(error);
  }
};

export const getVisitsByGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { guardId } = req.params;
    const visits = await VisitService.getVisitsByGuard(guardId);
    res.status(200).json(visits);
  } catch (error) {
    next(error);
  }
};
