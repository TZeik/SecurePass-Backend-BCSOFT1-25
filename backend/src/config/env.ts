import dotenv from 'dotenv';
dotenv.config();

// aqui valido variables no cargadas

const checkEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`La variable ${key} no está definida en .env`);
  return value;
};

export const env = {
  MONGODB_URI: checkEnv('MONGODB_URI'),
  PORT: process.env.PORT || '5000',
  JWT_SECRET: checkEnv('JWT_SECRET'),
};

console.log("JWT_SECRET:", process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
  throw new Error("La clave JWT_SECRET no está definida en .env");
}
