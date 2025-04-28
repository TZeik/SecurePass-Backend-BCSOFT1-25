import { UserService } from "../../src/services/UserService";
import { UserRole } from "../../src/interfaces/IUser";

describe("Prueba de UserService", () => {
  it("Crear usuario en MongoDB > Hashear contraseña", async () => {
    const user = await UserService.createUser({
      nombre: "Ramón Gómez Díaz",
      email: "ramon@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "4",
      torre: "A",
    });

    const foundUser = await UserService.findByEmail("ramon@example.com");

    expect(foundUser).not.toBeNull;
    expect(foundUser?.id.toString).toBe(user.id.toString);
    expect(foundUser?.email).toBe(user.email);
    expect(user.password).not.toBe("password123");
  });
});

