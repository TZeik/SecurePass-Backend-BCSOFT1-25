import mongoose, { Schema, Model } from 'mongoose';
import { IVisit } from '../interfaces/IVisit';

export const visitSchema: Schema = new mongoose.Schema({
  residente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nombreVisitante: {
    type: String,
    required: true
  },
  documentoVisitante: {
    type: String,
    required: true
  },
  imagenUrl: {
    type: String,
  },
  fechaAutorizacion: {
    type: Date,
    default: Date.now
  },
  fechaEntrada: {
    type: Date
  },
  fechaSalida: {
    type: Date
  },
  qrId: {
    type: String,
    unique: true
  },
  estado: {
    type: String,
    enum: ['autorizado', 'procesando', 'finalizado'],
    default: 'autorizado'
  },
  motivo: {
    type: String,
    required: true
  }
});

export const Visit: Model<IVisit> = mongoose.model<IVisit>('Visit', visitSchema);
export default Visit;