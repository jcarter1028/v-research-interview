# Database

## Database Design
TODO: import diagram and write about reasoning

Running postrgresql database. For demo purposes, simply using the postres user, and database called "".

## Create Databse Schema

1. Create database
```
CREATE DATABASE 'db1'
```

The Schema for the databse is defined in `schema.sql`. To create the tables within the postresql database, 

TODO: change cmd to psql

```bash
$ "/Applications/Postgres.app/Contents/Versions/17/bin/psql" -p5433 "db1" -U postgres -f schema.sql
```

In other terminal, set to materials schema: 
`SET search_path TO materials, public;`


Join queries:
`SELECT * FROM brand INNER JOIN manufacturer ON (brand.manufacturer_id=manufacturer.id);`
`SELECT (brand.name,type,manufacturer.name) FROM brand INNER JOIN manufacturer ON (brand.manufacturer_id=manufacturer.id) WHERE manufacturer_id=2;`


`SELECT brand.id, brand.name AS brand_name, type, manufacturer.name AS manunfacturer_name   FROM brand INNER JOIN manufacturer ON (brand.manufacturer_id=manufacturer.id);`
