import { Router } from 'express';
import {  registerEntry, registerExit } from '../controllers/visitController';

const router = Router();



// Registrar entrada de visitas
router.post('/visit/entrada', registerEntry);

// Registrar salida de visitas
router.put('/visit/salida/:qrId', registerExit);


export default router;