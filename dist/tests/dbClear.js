"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Vehicle_1 = require("../src/models/Vehicle");
const Visit_1 = require("../src/models/Visit");
const env_1 = require("../src/config/env");
const User_1 = require("../src/models/User");
async function clearDataBase() {
    await mongoose_1.default.connect(env_1.env.MONGODB_URI);
    await User_1.User.deleteMany({});
    await Visit_1.Visit.deleteMany({});
    await Vehicle_1.Vehicle.deleteMany({});
    console.log('Se ha limpiado la base de datos correctamente');
    await mongoose_1.default.disconnect();
}
clearDataBase();
