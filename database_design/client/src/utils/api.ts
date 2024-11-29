import axios from "axios"


// For demo purposes, we I am setting to localhost. 
// For any hosted versions, this would be set using a .env file
const serverUrl = 'http://localhost:3000'; 

export type Material = {
    material_id: string,
    material_name: string,
    cas: string,
    manufacturer_name: string,
    brand_type: string,
    brand_name: string,
    ghg: number,
    energy_input: number,
    eu_regulation: number | null,
    supply_risk: number | null,
    critical_value: number | null
}

const getData = async (queryParam: string): Promise<Material[]> => {
    if (queryParam) {
        const url = `${serverUrl}/data?filter=${queryParam}`;
        try {
            const response = await axios.get(url);
            const data = await response.data;
            return data;
        } catch (err) {
            console.log("Error retrieving data: ", err);
            // return an error message if this is the case!
        }
    }
    return [];
}

export {
    getData
}