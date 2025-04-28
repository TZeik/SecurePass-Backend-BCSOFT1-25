import { Router } from 'express';
import {  registerEntry, registerExit } from '../middleware/visitController';
import { validateTask } from '../middleware/validateTask';
const router = Router();



// Registrar entrada de visitas
router.post('/visit/entrada', registerEntry);

// Registrar salida de visitas
router.put('/visit/salida/:qrId', registerExit);


export default router;