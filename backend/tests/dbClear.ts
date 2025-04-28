import mongoose from "mongoose";
import { Vehicle } from "../src/models/Vehicle";
import { Visit } from "../src/models/Visit";
import { env } from "../src/config/env";
import { User } from "../src/models/User";


async function clearDataBase(){

    await mongoose.connect(env.MONGODB_URI);

    await User.deleteMany({});
    await Visit.deleteMany({});
    await Vehicle.deleteMany({});

    console.log('Se ha limpiado la base de datos correctamente');

    await mongoose.disconnect();
}

clearDataBase();