export type Manufacturer = {
    id: number,
    name: string
};

export type Material = {
    id: string,
    name: string,
    cas: string
}
export type BrandType = "generic" | "polyers" | "genericFibres" | "metalsAndAlloys";
export type Brand = {
    id: number,
    manufacturerId: number,
    materialId: string,
    name: string,
    type: string
}

export type Property = {
    id: number,
    brandId: number,
    ghg: number,
    energyInput: number, 
    euRegulation: number,
    supplyRisk: number,
    criticalValue: number,
}
