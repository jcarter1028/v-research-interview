import type { Manufacturer, Material } from "./types"

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

const buildInsertQuery = (tableName: string, valuesStr: string) => {

}


export {
    deleteAllDataFromTableQuery,
    insertManufacturerRowQuery,
    insertManufacturerQuery,
    insertMaterialQuery
}