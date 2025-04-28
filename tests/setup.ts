import mongoose from 'mongoose';
import { env } from '../src/config/env';
import { User } from '../src/models/User';
import { Visit } from '../src/models/Visit';
import { Vehicle } from '../src/models/Vehicle';


beforeAll(async () => {
  await mongoose.connect(env.MONGODB_URI);
  await User.deleteMany({});
  await Visit.deleteMany({});
  await Vehicle.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});