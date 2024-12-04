import pg from "pg";
const { Pool } = pg;

const DB_NAME =  'db1';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = 'root';
const DB_PORT = 5433;

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
})

const allDataQueryText = `
SELECT b.id AS brand_id
    , b.name AS brand_name
    , b.type AS brand_type
    , man.name AS manufacturer_name
    , mat.id AS material_id
    , mat.name AS material_name
    , mat.cas
    , p.ghg, p.energy_input, p.eu_regulation, p.supply_risk, p.critical_value
FROM Materials.brand b
INNER JOIN Materials.manufacturer man
    on b.manufacturer_id = man.id
INNER JOIN Materials.material mat
    on b.material_id = mat.id
INNER JOIN Materials.properties p
    on p.brand_id = b.id`;

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

const getAllData = async () => {
    const res = await pool.query(allDataQueryText);
    return res.rows;
}

const getFilteredData = async (varVal: string) => {
    const filterConditionSql = `
    WHERE b.name = $1::text 
    OR man.name = $1::text 
    OR mat.id = $1::text
    OR mat.name = $1::text`;
    const queryStr = `${allDataQueryText} ${filterConditionSql}`

    const res = await pool.query(queryStr, [varVal]);
    return res.rows;
}

/*const getDataByBrandName = async (brandName: string) => {
    const queryStr = `
        ${allDataQuery}
        WHERE b.name = '${brandName}'
    ;`
    const res = await pool.query(queryStr, );
    return res.rows;
}

const filterQueryStr = (filterTypeStr: string, filterValue: string) => {
    const queryStr = `
    ${allDataQuery}
    WHERE ${filterTypeStr} = '${filterValue}' 
;`
return queryStr;
}

export type FilterType = "brandName" | "manufacturerName" | "materialName" | "materialId";
const getFilteredValues = async (type: FilterType, value: string) => {
    let filterTypeStr;
    switch (type) {
        case "brandName": filterTypeStr = "b.name"; break;
        case "manufacturerName": filterTypeStr = "man.name";  break;
        case "materialName": filterTypeStr = "mat.name";  break;
        case "materialId": filterTypeStr = "mat.id";  break;
        default:
            break;
    }
    console.log("filterTypeStr: ", filterTypeStr);
    console.log("Value: ", value);
    if (filterTypeStr) {
        const queryString = filterQueryStr(filterTypeStr, value);
        const res = await pool.query(queryString);
        return res.rows;
    }
    return [];
} */

const getTableIdsAndNames = async (table: string) => {
    const query = `SELECT id, name FROM Materials.${table}`;
    const res = await pool.query(query);
    return res.rows;
}


export {
    getAllData,
    getFilteredData,
    getTableIdsAndNames
}