import pg from 'pg';


const DB_NAME =  'db1';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = 'root';
const DB_PORT = 5433;

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


