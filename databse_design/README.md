# Database Design

## Database Design

## API Design

The API is designed around the retrieval of the non-property tables:
* BrandGroup
* Brand
* Material
* Manufacturer

Nested json to be returned. 

Filter per name (for each group) using query parameter.

### Endpoints

Filter based on
* a material id:
* brand name
* brand type
* manufacturer name

Use query parameters to do the filering
```
GET /data?any={search_val}
GET /data?material_name={material_name}
GET /data?material_id={mat_id}
GET /data?manufacturer_name={manufacturer_name}
GET /data?brand_type={brand_type}
GET /data?brand_name={brand_name}
```

Return flattened list list of materials and details based on what filter values
```json
    {
        "data": [
            {
                "material_id": "PA6",
                "material_name": "Polyamide 6",
                "cas": "25038-54-4",
                "manufacturer_name": "Generic",
                "brand_group": "Generic",
                "brand_name": "Generic PA6",
                "GHG": "9.3",
                "EnergyInput": "123.39",
                "EU_Regulation": "0",
                "supply_risk": null,
                "critical_value": 1
            }
        ]
    }
```

This can then be extended to filter based on multiple values e.g: material name and manufacturer name.