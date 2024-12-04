// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { getAllData, getFilteredData, getTableIdsAndNames } from "./database";

const app: Express = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Materials Database server: running");
});

app.get("/data", async (req: Request, res: Response) => {
    const filterVal = req.query.filter;
    if (filterVal) {
      const filteredData = await getFilteredData(filterVal as string);
      res.json(filteredData);
    } else {
      const allData = await getAllData();
      res.json(allData);
    }
});

app.get("/manufacturers", async (_req: Request, res: Response) => {
  const manufacturers = await getTableIdsAndNames('manufacturer');
  res.json(manufacturers);
})

app.get("/materials", async (_req: Request, res: Response) => {
  const materials = await getTableIdsAndNames('material');
  res.json(materials);
})

app.get("/brands", async (_req: Request, res: Response) => {
  const brands = await getTableIdsAndNames('brand');
  res.json(brands);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});