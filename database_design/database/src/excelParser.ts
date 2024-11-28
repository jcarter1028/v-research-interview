import readXlsxFile from 'read-excel-file/node';
import { Manufacturer, Material, BrandType, Brand, Property } from './types';

const parseManufacturers = (rows: Array<any>): Array<Manufacturer> => {
    const manufacturerCol = 1;
    const manufacturerRows = rows.map((row) => row[manufacturerCol]);
    const manufacturers = [...new Set(manufacturerRows)] // remove duplicate values
         // filter out all null values
        .filter(name => name != null)
        // Add ids
        .map((name,i) => {
            return {
                id: i,
                name
            }
        }); // add 
    return manufacturers;
}

const parseMaterials = (rows: Array<any>): Array<Material> => {
    const materialIdRows = rows.map((row) => row[2]);
    const materialIds = [...new Set(materialIdRows)].filter(id => id != null);
    const materialRows = rows.map((row) => row.slice(2, 5));
    const materials = materialIds.map((id) => {
        //find first element that satisfies the requirements
        const material = materialRows.find(m => m[0] === id);
  
            return {
                id,
                name: material[1],
                cas: material[2]
            }
    });
    return materials;  
}

const getBrandType = (cellVal: string): BrandType => {
    switch (cellVal) {
        case "Generic": return "generic";
        case "Brands - Polyers": return "polyers";
        case "Generic Fibres": return "generic_fibres";
        case "Metals & Alloys": return "metals_and_alloys"
        default: return "generic";
    }
}

const parseBrandsAndProperties = (rows: Array<any>, manufacturers: Manufacturer[]) => {
    let brandType = "";
    let brands: Brand[] = [];
    let properties: Property[] = [];
    let id = 0;
    rows.forEach(row => {
        if (row[1] === null) {
            // brand type row
            brandType = getBrandType(row[0]);
        } else {
            const manufacturerIndex = manufacturers.findIndex((m) => m.name === row[1]);
            const manufacturerId = manufacturers[manufacturerIndex].id;
            const brand: Brand = {
                id,
                manufacturerId,
                materialId: row[2],
                name: row[0],
                type: brandType 
            }
            brands.push(brand);

            const property: Property = {
                id,
                brandId: id,
                ghg: row[5] === 'NULL' ? null : row[5],
                energyInput: row[6] === 'NULL' ? null : row[6],
                euRegulation: row[7] === 'NULL' ? null : row[7],
                supplyRisk: row[8] === 'NULL' ? null : row[8],
                criticalValue: row[9] === 'NULL' ? null : row[9]
            }
            properties.push(property);
            id++;
        }
    });
    return {
        brands,
        properties
    }
}

const parseMaterialsExcel = async () => {
    const rows = await readXlsxFile('./materials.xlsx');
    rows.shift(); // remove title

    const manufactureres = parseManufacturers(rows);
    const materials = parseMaterials(rows);
    const {brands, properties} = parseBrandsAndProperties(rows, manufactureres);
    return {
        brands,
        manufactureres,
        materials,
        properties
    }


}

export {
    parseMaterialsExcel
}
