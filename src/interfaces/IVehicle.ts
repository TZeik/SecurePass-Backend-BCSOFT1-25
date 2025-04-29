import { Document, Schema, Types } from 'mongoose';

export enum OwnerType {
  RESIDENTE = 'residente',
  VISITA = 'visitante',
}

export interface IVehicleInput{
  propietario: Types.ObjectId;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  imagenUrl?: string; // URL de Cloudinary
}

export interface IVehicle extends IVehicleInput, Document{
  fechaRegistro: Date;
}