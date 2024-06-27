export interface IMigration {
    run (): Promise<void>;
}

export interface Database {
    datname: string;
}

export interface Schema {
    schema_name: string;
}

export interface Table {
    table_name: string;
}
