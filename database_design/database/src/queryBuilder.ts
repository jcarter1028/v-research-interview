import type { Brand, Manufacturer, Material, Property } from "./types"

const pgQuery = 
{ text:
    'INSERT INTO "users" ("email", "name") VALUES ($1, $2), ($3, $4) RETURNING "id"',
   values: 
    [ 'test@example.com', 'Fred', 'test2@example.com', 'Lynda' ] 
}

const deleteAllDataFromTableQuery = (tableName: string) => {
    return `DELETE FROM ${tableName}`;
}

const insertManufacturerRowQuery = () => {
    return `INSERT INTO manufacturer (id, name) VALUES ($1, $2);`
}

const insertManufacturerQuery = (manufacturers: Manufacturer[]) => {
    let valueField = 'VALUES';
    manufacturers.forEach((manufacturer, i) => {
        valueField = `${valueField} ${i === 0 ? '' : ','} (${manufacturer.id}, '${manufacturer.name}')`
    });
    const query = `INSERT INTO manufacturer (id, name) ${valueField};`
    return query;
}

const insertMaterialQuery = (materials: Material[]) => {
    let valueField = 'VALUES';
    materials.forEach((material,i) => {
        valueField = `${valueField} ${i === 0 ? '' : ','} ('${material.id}', '${material.name}', '${material.cas}') `
    });
    const query = `INSERT INTO material (id, name, cas) ${valueField};`
    return query;
}

const insertBrandQuery = (brands: Brand[]) => {
    let valueField = 'VALUES';
    brands.forEach((brand,i) => {
        valueField = `${valueField} ${i === 0 ? '' : ','} (${brand.id}, '${brand.name}', '${brand.type}', ${brand.manufacturerId}, '${brand.materialId}')`
    })
    const query = `INSERT INTO brand (id, name, type, manufacturer_id, material_id) ${valueField}`;
    return query;
}

const valOrNullStr = (value: number | null) => {
    return value === null ? 'NULL' : value;
}

const insertPropertiesQuery = (properties: Property[]) => {
    let valueField = 'VALUES';
    properties.forEach((property, i) => {
        valueField = `${valueField} ${i === 0 ? '' : ','} (
            ${property.id}, 
            ${property.brandId}, 
            ${valOrNullStr(property.ghg)}, 
            ${valOrNullStr(property.energyInput)}, 
            ${valOrNullStr(property.euRegulation)}, 
            ${valOrNullStr(property.supplyRisk)}, 
            ${valOrNullStr(property.criticalValue)}
        )`
    })
    const query = `INSERT INTO properties (id, brand_id, ghg, energy_input, eu_regulation, supply_risk, critical_value) ${valueField}`;
    return query;
}

export {
    deleteAllDataFromTableQuery,
    insertManufacturerRowQuery,
    insertManufacturerQuery,
    insertMaterialQuery,
    insertBrandQuery,
    insertPropertiesQuery
}