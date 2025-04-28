"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// aqui valido variables no cargadas
const checkEnv = (key) => {
    const value = process.env[key];
    if (!value)
        throw new Error(`La variable ${key} no está definida en .env`);
    return value;
};
exports.env = {
    MONGODB_URI: checkEnv('MONGODB_URI'),
    PORT: process.env.PORT || '5000',
    JWT_SECRET: checkEnv('JWT_SECRET'),
};
