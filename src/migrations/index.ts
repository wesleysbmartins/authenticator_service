import { SQL } from "../adapters/database/sql/SQL";
import { Migration } from "./Migration";
import { MigrationDatabase } from "./databases/MigrationDatabase";
import { MigrationSchema } from "./schemas/MigrationSchema";
import { MigrationTable } from "./tables/MigrationTable";
import { MigrationTableUser } from "./tables/MigrationTableUsers";

const sql = new SQL();
const database = new MigrationDatabase(sql);
const schema = new MigrationSchema(sql);
const table = new MigrationTable(
    sql,
    new MigrationTableUser(sql),
);

const sqlMigration = new Migration(database, schema, table);

export default sqlMigration;
