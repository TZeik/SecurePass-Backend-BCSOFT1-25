import mongoose, { Schema, model } from "mongoose";
import { IVehicle, OwnerType } from "../interfaces/IVehicle";

const vehicleSchema = new mongoose.Schema({
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: [/^[A-Z]{1}-\d{6}$/, 'Formato de placa inválido (A-123456)']
  },
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
