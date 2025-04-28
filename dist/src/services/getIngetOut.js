"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitController_1 = require("../middleware/visitController");
const validateTask_1 = require("../middleware/validateTask");
const router = (0, express_1.Router)();
// Registrar entrada de vehículo
router.post('/visitas/:placa/entrada', validateTask_1.validateTask, visitController_1.registerEntry);
// Registrar salida de vehículo
router.put('/vehicle/salida/:placa', validateTask_1.validateTask, visitController_1.registerExit);
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Ruta de prueba funcionando' });
});
exports.default = router;
