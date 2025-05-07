import { Request, Response } from "express";
import { Visit } from "../models/Visit";
import { User } from "../models/User";
import { Vehicle } from "../models/Vehicle";
import mongoose, { Types } from "mongoose";
import { IVisit } from "../interfaces/IVisit";

interface ResidentInfo {
  _id: Types.ObjectId;
  nombre?: string;
  apartamento?: string;
  torre?: string;
}

// interface GuardInfo {
//   _id: Types.ObjectId;
//   nombre?: string;
// }

// interface VehicleInfo {
//   _id: Types.ObjectId;
//   placa?: string;
//   marca?: string;
//   modelo?: string;
//   color?: string;
// }

// interface VisitReport {
//   _id: Types.ObjectId;
//   nombreVisitante: string;
//   documentoVisitante: string;
//   motivo: string;
//   estado: string;
//   fechas: {
//     autorizacion: Date;
//     entrada?: Date;
//     salida?: Date;
//   };
//   residente: {
//     nombre: string;
//     apartamento: string;
//     torre: string;
//   } | null;
//   guardia: {
//     nombre: string;
//   } | null;
//   vehiculo: {
//     placa: string;
//     marca: string;
//     modelo: string;
//     color: string;
//   } | null;
//   qrId?: string;
//   imagenUrl?: string;
// }

// export const getVisitReport = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { Fdesde, Fhasta, Nresidente, Pvehiculo, Vestado, guardiaId } =
//       req.query;

//     const filtro: mongoose.FilterQuery<any> = {};

//     // Filtrar por rango de fechas
//     if (Fdesde || Fhasta) {
//       filtro.fechaEntrada = {};
//       if (Fdesde) filtro.fechaEntrada.$gte = new Date(Fdesde as string);
//       if (Fhasta) filtro.fechaEntrada.$lte = new Date(Fhasta as string);
//     }

//     // Filtrar por residente
//     if (Nresidente) {
//       if (Types.ObjectId.isValid(Nresidente as string)) {
//         filtro.residente = new Types.ObjectId(Nresidente as string);
//       } else {
//         const residentes = await User.find({
//           nombre: { $regex: Nresidente as string, $options: "i" },
//           role: "residente",
//         })
//           .select("_id")
//           .lean();

//         if (residentes.length > 0) {
//           filtro.residente = { $in: residentes.map((r) => r._id) };
//         } else {
//           res.status(200).json([]);
//           return;
//         }
//       }
//     }

//     // Filtrar por vehículo
//     if (Pvehiculo) {
//       const vehiculos = await Vehicle.find({
//         placa: { $regex: Pvehiculo as string, $options: "i" },
//       })
//         .select("_id")
//         .lean();

//       if (vehiculos.length > 0) {
//         filtro.vehiculo = { $in: vehiculos.map((v) => v._id) };
//       } else {
//         res.status(200).json([]);
//         return;
//       }
//     }

//     // Filtrar por estado
//     if (Vestado) {
//       if (
//         ["autorizado", "procesando", "finalizado"].includes(Vestado as string)
//       ) {
//         filtro.estado = Vestado as string;
//       }
//     }

//     // Filtrar por guardia
//     if (guardiaId && Types.ObjectId.isValid(guardiaId as string)) {
//       filtro.guardia = new Types.ObjectId(guardiaId as string);
//     }
//     const visitas = await Visit.find(filtro)
//       .populate<{ residente: ResidentInfo }>(
//         "residente",
//         "nombre apartamento torre"
//       )
//       .populate<{ guardia: GuardInfo }>("guardia", "nombre")
//       .populate<{ vehiculo: VehicleInfo }>(
//         "vehiculo",
//         "placa marca modelo color"
//       )
//       .sort({ fechaEntrada: -1 })
//       .lean();

//     // Mapeo
//     const reporte: VisitReport[] = visitas.map((visita) => {
//       const reportItem: VisitReport = {
//         _id: visita._id,
//         nombreVisitante: visita.nombreVisitante,
//         documentoVisitante: visita.documentoVisitante,
//         motivo: visita.motivo,
//         estado: visita.estado,
//         fechas: {
//           autorizacion: visita.fechaAutorizacion,
//           entrada: visita.fechaEntrada,
//           salida: visita.fechaSalida,
//         },
//         residente:
//           visita.residente &&
//           typeof visita.residente === "object" &&
//           !(visita.residente instanceof Types.ObjectId)
//             ? {
//                 nombre: visita.residente.nombre || "No disponible",
//                 apartamento: visita.residente.apartamento || "No disponible",
//                 torre: visita.residente.torre || "No disponible",
//               }
//             : null,
//         guardia:
//           visita.guardia &&
//           typeof visita.guardia === "object" &&
//           !(visita.guardia instanceof Types.ObjectId)
//             ? {
//                 nombre: visita.guardia.nombre || "No disponible",
//               }
//             : null,
//         vehiculo:
//           visita.vehiculo &&
//           typeof visita.vehiculo === "object" &&
//           !(visita.vehiculo instanceof Types.ObjectId)
//             ? {
//                 placa: visita.vehiculo.placa || "No disponible",
//                 marca: visita.vehiculo.marca || "No disponible",
//                 modelo: visita.vehiculo.modelo || "No disponible",
//                 color: visita.vehiculo.color || "No disponible",
//               }
//             : null,
//       };

//       if (visita.qrId) reportItem.qrId = visita.qrId;
//       if (visita.imagenUrl) reportItem.imagenUrl = visita.imagenUrl;

//       return reportItem;
//     });

//     res.status(200).json(reporte);
//   } catch (err) {
//     console.error("Error generando reporte de visitas:", err);
//     res.status(500).json({
//       message: "Error al generar el reporte",
//       error: err instanceof Error ? err.message : "Error desconocido",
//     });
//   }
// };


export const getVisitHistoryByResident = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { residenteId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(residenteId)) {
      res.status(400).json({ message: "ID de residente inválido" });
      return;
    }


    const visitas = await Visit.find({ residente: residenteId })
      .populate<{ residente: ResidentInfo }>(
        "residente",
        "nombre apartamento torre"
      )
      .populate("guardia", "nombre")
      .sort({ fechaEntrada: -1 })
      .lean();

    res.status(200).json(visitas);
  } catch (err) {
    console.error("Error obteniendo historial de visitas:", err);
    res.status(500).json({
      message: "Error al obtener el historial de visitas",
      error: err instanceof Error ? err.message : "Error desconocido",
    });
  }
};


