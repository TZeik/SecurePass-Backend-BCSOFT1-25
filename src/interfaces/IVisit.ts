import { Document } from 'mongoose';

export interface IVisitInput {
  residente: string;
  nombreVisitante: string;
  documentoVisitante: string;
  fechaEntrada?: Date;
  fechaSalida?: Date;
  qrId?: string;
  motivo: string;
  imagenUrl?: string; // URL de Cloudinary
  creadoPor?: string; // Nombre del usuario que hizo la solicitud
}

export interface IVisit extends IVisitInput, Document {
  fechaAutorizacion: Date;
  estado: 'autorizado' | 'procesando' | 'finalizado';
}