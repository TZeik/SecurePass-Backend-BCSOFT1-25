"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).json({ error: "Token no proporcionado." });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Token inválido o expirado." });
    }
};
exports.verifyToken = verifyToken;
