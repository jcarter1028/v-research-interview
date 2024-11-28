import pg from 'pg';


const DB_NAME =  'db1';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = 'root';
const DB_PORT = 5433;


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


/*const connect = async () => {
    // Run client
    await client.connect();
    console.log("Client Connected");

    // Create databse if not exist already
    //await createDabatabase()

    // close client
    client.end();
}*/

class DatabaseConnector {
    private pgClient: pg.Client;

    constructor() {
       this.pgClient = new pg.Client({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
            database: DB_NAME,
        }); 
    }

    connect = async () => {
        await this.pgClient.connect();
        console.log("Database Client Connected");    
    }

    disconnect = async () => {
        await this.pgClient.end();
        console.log("Databse Client Ended")
    }

    setSchema = async (schema: string) => {
        const queryString = `SET search_path TO ${schema}`;
        await this.pgClient.query(queryString);
    }

    query = async (queryString: string, values?: string[]) => {
        const result = await this.pgClient.query(queryString, values);
        return result;
    }
}

export {
    DatabaseConnector
}


