import SQL from "../../adapters/database/sql/SQL";
import { IMigration, Schema } from "../IMigration";

export class MigrationSchema implements IMigration {

    constructor(
        private readonly sql : SQL,
    ) {}

    async run(): Promise<void> {
        const schemaName = process.env.DB_SCHEMA!;

        const schema : Schema = {
            schema_name: schemaName,
        };

        let query = "SELECT schema_name FROM information_schema.schemata;";

        const res = await this.sql.runQuery(query);
        const schemas = res.rows as Schema[];

        const exists = schemas.filter(value => value.schema_name === schema.schema_name);

        if (exists.length === 0) {
            query = `CREATE SCHEMA ${schemaName};`;
            await this.sql.runQuery(query);
            console.log(`CREATE SCHEMA ${schemaName} SUCCESS`);
        }
    }
}
