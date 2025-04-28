"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const IUser_1 = require("../interfaces/IUser");
describe("Prueba de UserService", () => {
    it("Crear usuario en MongoDB > Hashear contraseña", async () => {
        const user = await UserService_1.UserService.createUser({
            nombre: "Ramón Gómez Díaz",
            email: "ramon@example.com",
            password: "password123",
            role: IUser_1.UserRole.RESIDENTE,
            apartamento: "4",
            torre: "A",
        });
        const foundUser = await UserService_1.UserService.findByEmail("ramon@example.com");
        expect(foundUser).not.toBeNull;
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.id.toString).toBe(user.id.toString);
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.email).toBe(user.email);
        expect(user.password).not.toBe("password123");
    });
});
