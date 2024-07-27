import SQL from "../../adapters/database/sql/SQL";
import { IMigration, Table } from "../IMigration";
import { MigrationTableUser } from "./MigrationTableUsers";

const allTables : Table[] = [{
    table_name: "users",
}];

export class MigrationTable implements IMigration {

    constructor(
        private readonly sql : SQL,
        private readonly usersMigration : MigrationTableUser,
    ) {}

    async run(): Promise<void> {
        const tablesToCreate : Table[] = [];

        try {
            const schemaName = process.env.DB_SCHEMA!;

            let query = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${schemaName}' AND table_type = 'BASE TABLE';`;

            const res = await this.sql.runQuery(query);
            const tables = res.rows as Table[];

            for (let i = 0; i < allTables.length; i++) {
                const table = allTables[i];

                const exists = tables.filter(value => value.table_name === table.table_name);
                if (exists.length === 0) tablesToCreate.push(table);
            }

            for (let i = 0; i < tablesToCreate.length; i++) {
                const table = tablesToCreate[i];

                if (table.table_name === "users") await this.usersMigration.run();
            }
        } catch(err) {
            console.log("CREATE TABLES ERROR\nTABLES TO CREATE\n", ...tablesToCreate)
        }
    }   
}
