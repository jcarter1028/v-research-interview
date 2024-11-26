// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { getMaterialData } from "./database";

const app: Express = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/data", (req: Request, res: Response) => {
    console.log("IN here!")
    res.json(getMaterialData());
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});