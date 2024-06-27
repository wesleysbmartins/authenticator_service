import { Client } from "pg";

export interface ISQL {
    connect() : Promise<Client>;
    runQuery(query: string): Promise<any>;
    disconnect() : Promise<void>;
}

export interface ISQLCredentials {
    port: number;
    host: string;
    user: string;
    password: string;
    database?: string;
    schema?: string;
}
