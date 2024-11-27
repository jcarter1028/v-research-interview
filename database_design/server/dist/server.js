"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
//dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/data", (req, res) => {
    console.log("IN here!");
    res.send(database_1.getMaterialData);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
