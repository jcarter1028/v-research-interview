"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterialData = void 0;
const exampleData = [
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
        ghg: 0.25,
        energyInput: 0.3,
        euReguation: 0,
        supplyRisk: 6,
        criticalValue: null
    }
];
const getMaterialData = () => {
    return exampleData;
};
exports.getMaterialData = getMaterialData;
