import { Document } from 'mongoose';

export interface IVisitInput {
  residente: string;
  guardia: string;
  nombreVisitante: string;
  documentoVisitante: string;
  imagenUrl?: string; // URL de Cloudinary
  fechaEntrada?: Date;
  fechaSalida?: Date;
  qrId?: string;
  motivo: string;
}

export interface IVisit extends IVisitInput, Document {
  fechaAutorizacion: Date;
  estado: 'autorizado' | 'procesando' | 'finalizado';
}