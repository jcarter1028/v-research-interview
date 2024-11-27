const { Pool, Client } = require('pg')

const DB_NAME =  'db1'; // 'db-name';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = 'root';
const DB_PORT = '5433';


const client = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
});

/*const createDabatabase = async () => {
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
    if (res.rowCount === 0) {
        console.log(`${DB_NAME} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${DB_NAME}";`);
        console.log(`created database ${DB_NAME}`);
    } else {
        console.log(`${DB_NAME} database exists.`);
    }
}*/

const createTable = async () => {
    const queryString = `
        CREATE TABLE users (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(30),
            email VARCHAR(30)
        );`;
        const res = await client.query(`${queryString}`);
        console.log("RES: ", res);
}

const insertData = async () => {
    const queryString = `
        INSERT INTO users (name, email)
            VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');`
    const res = await client.query(`${queryString}`);
    console.log("RES: ", res);
}


/*client.connect().then(()q => {
    console.log("Client Connected");

    client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);


    // Query

    /*pool.query("CREATE TABLE fish(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, color VARCHAR(50) NOT NULL)", (err, res) => {
        console.log(err, res);
        pool.end();
        client.end();
    });*/

//});

const getUsers = async () => {
    const queryString = `
    SELECT * FROM users ORDER BY id ASC
    `;
    const res = await client.query(`${queryString}`);
    console.log("RES: ", res);

    console.log(res.rows);

    /*await client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {


      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })*/
  }

const run = async () => {
    // Run client
    await client.connect();
    console.log("Client Connected");

    // Create databse if not exist already
    //await createDabatabase()

    // Create table
    //await createTable();

    // Insert values
    //await insertData();

    // Get values
    await getUsers();



    // close client
    client.end();
}

run();


