import { Router } from "express";
import { 
  registerEntry,
  registerExit,
  getAllVisits,
  getVisitById,
  getVisitByQR,
  updateVisitStatus,
  updateVisit,
  deleteVisit,
  getVisitsByResident,
  getVisitsByGuard
} from "../controllers/visitController";
import { getVisitHistoryByResident } from "../controllers/repController";

const router = Router();

// Registro de visitas
router.post('/visits/entry', registerEntry);
router.put('/visits/exit/:qrId', registerExit);

// Consultas de visitas
router.get('/visits', getAllVisits);
router.get('/visits/:id', getVisitById);
router.get('/visits/qr/:qrId', getVisitByQR);
// router.get('/visits/resident/:residenteId', getVisitsByResident);
router.get('/visits/guard/:guardId', getVisitsByGuard);
router.get("/visits/resident/:residenteId", getVisitHistoryByResident);
// Ruta para reportes de visitas
// router.get('/visits/report', getVisitReport);

//Ruta para obtenerla por id


// Actualización de visitas
router.patch('/visits/:id/status', updateVisitStatus);
router.put('/visits/:id', updateVisit);

// Eliminación de visitas
router.delete('/visits/:id', deleteVisit);

export default router;