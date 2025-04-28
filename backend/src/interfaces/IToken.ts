export interface JwtPayload {
    id: string;
    role: "admin" | "residente" | "guardia"; // Limita a roles específicos.
  }
  