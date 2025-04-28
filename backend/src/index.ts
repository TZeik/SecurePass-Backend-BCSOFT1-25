import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Se ha realizado la conexión con MongoDB Atlas'))
  .catch((err: Error) => console.error('Error al conectar a MongoDB Atlas: ', err));

app.get('/', (req, res) => {
    res.send('SecurePass API');
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en Puerto: ', PORT);
});