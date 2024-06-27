import { IMigration } from "./IMigration";
import { MigrationDatabase } from "./databases/MigrationDatabase";
import { MigrationSchema } from "./schemas/MigrationSchema";
import { MigrationTable } from "./tables/MigrationTable";

export class Migration implements IMigration  {
    constructor(
        private readonly migrationDatabase : MigrationDatabase,
        private readonly migrationSchema : MigrationSchema,
        private readonly migrationTable : MigrationTable,
    ) {}

    async run(): Promise<void> {
        await this.migrationDatabase.run();
        await this.migrationSchema.run();
        await this.migrationTable.run();
    }
}
