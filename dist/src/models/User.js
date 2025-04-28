"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const IUser_1 = require("../interfaces/IUser");
const userSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(IUser_1.UserRole),
        required: true,
    },
    imagenUrl: {
        type: String,
    },
    apartamento: {
        type: String,
        required: function () {
            return this.role === IUser_1.UserRole.RESIDENTE;
        },
    },
    torre: {
        type: String,
        required: function () {
            return this.role === IUser_1.UserRole.RESIDENTE;
        },
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
// comparacion de contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs_1.default.compare(candidatePassword, this.password);
};
exports.User = mongoose_1.default.model("User", userSchema);
exports.default = exports.User;
