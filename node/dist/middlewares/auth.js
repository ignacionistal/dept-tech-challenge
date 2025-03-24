"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized, missing token");
    }
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    jsonwebtoken_1.default.verify(token, jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.status(401).send("Unauthorized, expired or invalid token");
        }
        req.currentUserId = decoded.userId;
        return next();
    });
};
exports.auth = auth;
