import mongoose, { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IVisit } from "../interfaces/IVisit";

const visitSchema: Schema = new mongoose.Schema({
  residente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guardia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nombreVisitante: {
    type: String,
    required: true,
  },
  documentoVisitante: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  fechaAutorizacion: {
    type: Date,
    default: Date.now,
  },
  fechaEntrada: {
    type: Date,
  },
  fechaSalida: {
    type: Date,
  },
  qrId: {
    type: String,
    unique: true,
    default: uuidv4,
   
  },
  estado: {
    type: String,
    enum: ["autorizado", "procesando", "finalizado"],
    default: "autorizado",
  },
  motivo: {
    type: String,
    required: true,
  },
});

visitSchema.path("documentoVisitante").validate(function (value: string) {
  return value && value.length >= 5;
}, "El documento debe tener al menos 5 caracteres");

export const Visit: Model<IVisit> = mongoose.model<IVisit>(
  "Visit",
  visitSchema
);
export default Visit;
