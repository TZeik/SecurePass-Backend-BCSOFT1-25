import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, UserRole } from "../interfaces/IUser";
import e from "express";

const userSchema: Schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  apartamento: {
    type: String,
    required: function (this: IUser) {
      return this.role === UserRole.RESIDENTE;
    },
  },
  torre: {
    type: String,
    required: function (this: IUser) {
      return this.role === UserRole.RESIDENTE;
    },
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// comparacion de contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;