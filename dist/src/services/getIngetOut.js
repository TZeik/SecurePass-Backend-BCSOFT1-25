"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitController_1 = require("../controllers/visitController");
const router = (0, express_1.Router)();
// Registrar entrada de visitas
router.post('/visit/entrada', visitController_1.registerEntry);
// Registrar salida de visitas
router.put('/visit/salida/:qrId', visitController_1.registerExit);
exports.default = router;
