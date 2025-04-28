import { User } from "../models/User";
import { IUser, IUserInput, UserRole } from "../interfaces/IUser";
import { Types } from "mongoose";

export class UserService {
  static async createUser(userData: IUserInput): Promise<IUser> {
    if (
      userData.role === UserRole.RESIDENTE &&
      (!userData.apartamento || !userData.torre)
    ) {
      throw new Error("Apartamento y torre son requeridos para residentes");
    }

    const user = new User(userData);
    return await user.save();
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  static async findById(id: string | Types.ObjectId): Promise<IUser | null> {
    return await User.findById(id).exec();
  }

  static async updateUser(id: string | Types.ObjectId, updateData: Partial<Omit<IUser, "_id" | "password" | "comparePassword">>): Promise<IUser | null> {
    if (
      updateData.role === UserRole.RESIDENTE &&
      (!updateData.apartamento || !updateData.torre)
    ) {
      throw new Error("Apartamento y torre son requeridos para residentes");
    }

    return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  static async deleteUser(id: string | Types.ObjectId): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  }

  static async comparePasswords(userId: string | Types.ObjectId, candidatePassword: string): Promise<boolean> {
    const user = await User.findById(userId).select("+password").exec();
    if (!user) throw new Error("Usuario no encontrado");
    return await user.comparePassword(candidatePassword);
  }
}
