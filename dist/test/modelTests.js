"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Visit_1 = require("../models/Visit");
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
async function runTests() {
    await mongoose_1.default.connect(env_1.env.MONGODB_URI);
    // usuario residente de prueba
    const resident = await User_1.User.create({
        nombre: "Juan Pérez",
        email: "juan@example.com",
        password: "password",
        role: "residente",
        apartamento: "101",
        torre: "A",
    });
    console.log("Usuario creado:", resident);
    // visita asociada de prueba
    const visit = await Visit_1.Visit.create({
        residente: resident._id,
        nombreVisitante: "María García",
        documentoVisitante: "V-12345678",
        motivo: "Entrega de paquete",
        qrId: "qr-unique-id-123",
    });
    console.log("Visita creada:", visit);
    // consulta a las visitas del residente
    const visits = await Visit_1.Visit.find({ residente: resident._id });
    console.log("Visitas encontradas:", visits);
    // eliminacion de datos de prueba
    await User_1.User.deleteMany({ email: "juan@example.com" });
    await Visit_1.Visit.deleteMany({ qrId: "qr-unique-id-123" });
    await mongoose_1.default.connection.close();
}
runTests().catch(console.error);
