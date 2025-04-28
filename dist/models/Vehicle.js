"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const mongoose_1 = require("mongoose");
const vehicleSchema = new mongoose_1.Schema({
    residente: {
        type: String,
        ref: "User",
        required: true,
        validate: {
            validator: async (id) => {
                const user = await (0, mongoose_1.model)('User').findById(id);
                return (user === null || user === void 0 ? void 0 : user.role) === 'residente';
            },
            message: 'El residente no existe o no tiene el rol correcto'
        }
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
exports.Vehicle = (0, mongoose_1.model)("Vehicle", vehicleSchema);
