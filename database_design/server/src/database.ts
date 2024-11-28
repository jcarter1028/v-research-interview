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

const allDataQuery = `
SELECT b.id AS brand_id
    , b.name AS brand_name
    , b.type
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
    on p.brand_id = b.id
`;

const simpleQuery = `

SELECT * from brand;`

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

const getMaterialData = (): Material[] => {
    return exampleData;
}

const getDataByBrandName = async (brandName: string) => {
    const queryStr = `
        ${allDataQuery}
        WHERE b.name = '${brandName}'
    ;`
    const res = await pool.query(queryStr);
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
} 


const getManufacturers = async () => {
    const query = `SELECT id, name FROM Materials.manufacturer`;
    const res = await pool.query(query);
    return res.rows;
}

const getMaterials = async () => {
    const query = `SELECT id, name FROM Materials.material`;
    const res = await pool.query(query);
    return res.rows;
}

const getBrands = async () => {
    const query = `SELECT id, name FROM Materials.brand`;
    const res = await pool.query(query);
    return res.rows;
}


export {
    getManufacturers,
    getMaterialData,
    getMaterials,
    getBrands,
    getDataByBrandName,
    getFilteredValues
}