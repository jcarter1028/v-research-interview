// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { getManufacturers, getMaterials, getBrands, getMaterialData, getDataByBrandName, getFilteredValues, FilterType } from "./database";

const app: Express = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/data", async (req: Request, res: Response) => {
    const params = req.query;
    let filterType: FilterType | undefined;
    let value;
    if (params.brand_name) {
      filterType = "brandName";
      value = params.brand_name;
    } else if (params.manufacturer_name) {
      filterType = "manufacturerName"
      value = params.manufacturer_name;
    } else if (params.material_name) {
      filterType = "materialName"
      value = params.material_name;
    } else if (params.material_id) {
      filterType = "materialId"
      value = params.material_id;
    }
    if (filterType) {
      const data = await getFilteredValues(filterType, value as string);
      console.log("DATA: ", data);
      res.json(data);
    } else {
      res.json([])
    }
});

app.get("/manufacturers", async (_req: Request, res: Response) => {
  const manufacturers = await getManufacturers();
  res.json(manufacturers);
})

app.get("/materials", async (_req: Request, res: Response) => {
  const materials = await getMaterials();
  res.json(materials);
})

app.get("/brands", async (_req: Request, res: Response) => {
  const brands = await getBrands();
  res.json(brands);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});