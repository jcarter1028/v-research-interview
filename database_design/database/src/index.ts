import { parseMaterialsExcel } from "./excelParser";
import { DatabaseConnector } from "./database";

import { deleteAllDataFromTableQuery, insertManufacturerQuery, insertMaterialQuery } from "./queryBuilder";

const dbConnector = new DatabaseConnector();

const run = async () => {
    const {
        brands,
        manufactureres,
        materials,
        properties
    } = await parseMaterialsExcel();

    await dbConnector.connect();
    await dbConnector.setSchema('Materials');

    // Manufacturers
    await dbConnector.query(deleteAllDataFromTableQuery('manufacturer')); // Delete data from manufacturer table
    await dbConnector.query(insertManufacturerQuery(manufactureres)); // Insert all new data for manufacturers table

    // Materials
    await dbConnector.query(deleteAllDataFromTableQuery('material')); // Delete data from materials table
    await dbConnector.query(insertMaterialQuery(materials));


    await dbConnector.disconnect();

}

run();