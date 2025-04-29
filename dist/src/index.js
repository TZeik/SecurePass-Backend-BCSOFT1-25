"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const getIngetOut_1 = __importDefault(require("./services/getIngetOut"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Se ha realizado la conexión con MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar a MongoDB Atlas: ', err));
app.get('/', (req, res) => {
    res.send('SecurePass API');
});
app.use('/api', getIngetOut_1.default);
app.listen(PORT, () => {
    console.log('Servidor corriendo en Puerto: ', PORT);
});
