export type Material = {
    materialId: string,
    materialName: string,
    cas: string,
    manufacturerName: string,
    brandType: string,
    brandName: string,
    ghg: number,
    energyInput: number,
    euReguation: number | null,
    supplyRisk: number | null,
    criticalValue: number | null
}



const exampleData: Material[] = [
    {
        materialId: "PA6",
        materialName: "Polyamide 6",
        cas: "25038-54-4",
        manufacturerName: "Generic",
        brandType: "Generic",
        brandName: "Generic PA6",
        ghg: 9.3,
        energyInput: 123.39,
        euReguation: 0,
        supplyRisk: null,
        criticalValue: 1
    },
    {
        materialId: "PA6",
        materialName: "Polyamide 6",
        cas: "25038-54-4",
        manufacturerName: "Domo",
        brandType: "Polyers",
        brandName: "Econamid FL6",
        ghg:0.25,
        energyInput: 0.3,
        euReguation:0,
        supplyRisk: 6,
        criticalValue: null
    }
]


const getData = (queryParam: string): Meterial[] => {
   console.log("GET DATA: ", queryParam); 
   return exampleData;
}

export {
    getData
}