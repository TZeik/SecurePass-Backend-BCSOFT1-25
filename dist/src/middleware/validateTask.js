"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = void 0;
const validateTask = (req, res, next) => {
    // Validation logic here
    const { placa } = req.params;
    if (!placa) {
        res.status(400).json({ message: 'La placa es requerida' });
        return;
    }
    next();
};
exports.validateTask = validateTask;
