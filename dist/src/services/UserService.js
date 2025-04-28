"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const IUser_1 = require("../interfaces/IUser");
class UserService {
    static async createUser(userData) {
        if (userData.role === IUser_1.UserRole.RESIDENTE &&
            (!userData.apartamento || !userData.torre)) {
            throw new Error("Apartamento y torre son requeridos para residentes");
        }
        const user = new User_1.User(userData);
        return await user.save();
    }
    static async findByEmail(email) {
        return await User_1.User.findOne({ email }).exec();
    }
    static async findById(id) {
        return await User_1.User.findById(id).exec();
    }
    static async updateUser(id, updateData) {
        if (updateData.role === IUser_1.UserRole.RESIDENTE &&
            (!updateData.apartamento || !updateData.torre)) {
            throw new Error("Apartamento y torre son requeridos para residentes");
        }
        return await User_1.User.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    static async deleteUser(id) {
        await User_1.User.findByIdAndDelete(id).exec();
    }
    static async comparePasswords(userId, candidatePassword) {
        const user = await User_1.User.findById(userId).select("+password").exec();
        if (!user)
            throw new Error("Usuario no encontrado");
        return await user.comparePassword(candidatePassword);
    }
}
exports.UserService = UserService;
