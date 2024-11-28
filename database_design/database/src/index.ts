import { parseMaterialsExcel } from "./excelParser";
import { DatabaseConnector } from "./database";

import { deleteAllDataFromTableQuery, insertBrandQuery, insertManufacturerQuery, insertMaterialQuery, insertPropertiesQuery } from "./queryBuilder";

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

    // Delete 
    await dbConnector.query(deleteAllDataFromTableQuery('properties')); // Delete data form the property table
    await dbConnector.query(deleteAllDataFromTableQuery('brand')); // Delete data form the brand table
    await dbConnector.query(deleteAllDataFromTableQuery('material')); // Delete data from materials table
    await dbConnector.query(deleteAllDataFromTableQuery('manufacturer')); // Delete data from manufacturer table


    // Insert data into tables
    // Manufacturer
    await dbConnector.query(insertManufacturerQuery(manufactureres)); // Insert all new data for manufacturers table

    // Materials
    await dbConnector.query(insertMaterialQuery(materials));

    // Brands
    await dbConnector.query(insertBrandQuery(brands));

    // Properties
    await dbConnector.query(insertPropertiesQuery(properties));


    await dbConnector.disconnect();

}

run();