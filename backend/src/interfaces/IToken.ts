import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
    readonly id: string;
    readonly role: "admin" | "residente" | "guardia";
}

  