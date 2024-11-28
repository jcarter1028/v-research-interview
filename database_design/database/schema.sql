
CREATE SCHEMA Materials

-- Table for Manufacturer
CREATE TABLE IF NOT EXISTS Materials.Manufacturer (
    id int PRIMARY KEY,
    name  varchar(50) NOT NULL
);

-- Table for Material
CREATE TABLE IF NOT EXISTS Materials.Material (
    id varchar(50) PRIMARY KEY,
    name  varchar(50) NOT NULL,
    cas varchar(50)
);


-- Enum to represent the brand type. Could add some handling to check if it exists or not
CREATE TYPE Materials.brand_type AS ENUM('generic', 'polyers', 'generic_fibres', 'metals_and_alloys');

-- Table for Brand
CREATE TABLE IF NOT EXISTS Materials.Brand (
    id int PRIMARY KEY,
    name  varchar(50) NOT NULL,
    type brand_type,
    manufacturer_id int REFERENCES Materials.Manufacturer(id), -- FK
    material_id varchar(50) REFERENCES Materials.Material(id) -- FK
);

-- Table for Material Properties
CREATE TABLE IF NOT EXISTS Materials.Properties (
    id int PRIMARY KEY,
    brand_id int REFERENCES Materials.Brand(id), -- FK
    ghg float NULL,
    energy_input float NULL,
    eu_regulation int NULL,
    supply_risk int NULL,
    critical_value float NULL
);




