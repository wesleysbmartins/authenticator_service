import SQL from "../../services/database/sql/SQL";
import { IMigration } from "../IMigration";

export class MigrationTableUser implements IMigration {

    constructor(private readonly sql : SQL) {}

    async run(): Promise<void> {
        const schemaName = process.env.DB_SCHEMA;

        const queryToCreateUsers = `CREATE TABLE ${schemaName}.users (
            id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            token VARCHAR(255),
            createdAt DATE NOT NULL,
            updatedAt DATE NOT NULL,
            deletedAt DATE
        );`;

        await this.sql.runQuery(queryToCreateUsers);
        console.log(`CREATE TABLE users SUCCESS`);
    }
}
