import SQL from "../../services/database/sql/SQL";
import { Database, IMigration } from "../IMigration";

export class MigrationDatabase implements IMigration {

    constructor(
        private readonly sql : SQL,
    ) {}

    async run(): Promise<void> {
        const dbName = process.env.DB_NAME!;

        const database : Database = {
            datname: dbName,
        };

        let query = "SELECT datname FROM pg_database WHERE datistemplate = false;";

        const res = await this.sql.runQuery(query);
        const databases = res.rows as Database[];

        const exists = databases.filter(value => value.datname === database.datname);

        if (exists.length === 0) {
            query = `CREATE DATABASE ${dbName};`;
            await this.sql.runQuery(query);
            console.log(`CREATE DATABASE ${dbName} SUCCESS`);
        }
    }
}
