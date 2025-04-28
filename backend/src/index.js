"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var authMiddleware_1 = require("./middleware/authMiddleware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var MONGODB_URI = process.env.MONGODB_URI || '';
var PORT = process.env.PORT || 5000;
mongoose_1.default.connect(MONGODB_URI)
    .then(function () { return console.log('Se ha realizado la conexión con MongoDB Atlas'); })
    .catch(function (err) { return console.error('Error al conectar a MongoDB Atlas: ', err); });
app.get("/protected", authMiddleware_1.verifyToken, function (req, res) {
    res.json({ message: "Acceso permitido", user: res.locals.user });
});
var jwt = require("jsonwebtoken");
var token = jwt.sign({ id: 123, name: "Test User" }, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log(token);
app.get('/', function (req, res) {
    res.send('SecurePass API');
});
app.listen(PORT, function () {
    console.log('Servidor corriendo en Puerto: ', PORT);
});
