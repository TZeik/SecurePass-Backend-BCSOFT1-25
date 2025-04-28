import { Document, Schema } from 'mongoose';

export enum OwnerType {
  RESIDENTE = 'residente',
  VISITA = 'visitante',
}

export interface IVehicleInput{
  propietario: string;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  imagenUrl?: string; // URL de Cloudinary
}

export interface IVehicle extends IVehicleInput, Document{
  fechaRegistro: Date;
}