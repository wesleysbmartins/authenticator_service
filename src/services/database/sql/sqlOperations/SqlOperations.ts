import SQL from "../SQL";
import { ISqlOperations, IWhere } from "./ISqlOperations";

export class SqlOperations<T extends {}> implements ISqlOperations<T> {

    constructor(private readonly sql : SQL) {}
    
    
    async select(tableName: string, where: IWhere<T>): Promise<T> {
        const strWhere = where.params ? this.handleWhere(where.params, where.op ?? "AND") : "";
        const query = `SELECT * FROM ${tableName} ${strWhere};`;

        const res = await this.sql.runQuery(query);

        return res.rows;
    }

    insert(tableName: string, values: {}): Promise<T> {
        throw new Error("Method not implemented.");
    }
    update(tableName: string, set: {}, where: IWhere<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete(tableName: string, where: IWhere<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async rawQuery(query: string): Promise<T[]> {
        const { rows } = await this.sql.runQuery(query);
        return rows;
    }

    handleWhere(params: any, op: string) : string {
        let str = "";

        const keys = this.handleKeys(params);

        for (let i = 0; i < keys.length; i++) {
            if (i < keys.length - 1) {
                str = `${str} ${keys[i]} = '${params[keys[i]]}' ${op} `
            } else if (i === keys.length - 1) {
                str = `${str} ${keys[i]} = '${params[keys[i]]}'`
            }
        }

        return str;
    }

    handleSet(set: T) : string {
        throw new Error("Method not implemented.");

    }

    handleValues(values: T) : string {
        throw new Error("Method not implemented.");

    }

    handleKeys(obj: T) : string[] {
        return Object.keys(obj);
    }

    handleParamType(param: any) : string {
        let str = "";

        for (const [key, value] of Object.entries(param)) {
            if (value) {
                if (typeof(value) == "string") str = `${str} ${key} = '${value}'`;
                else if (typeof(value) == "number") str = `${str} ${key} = ${value}`;
                else if (value instanceof Date) str = `${str} ${key} = '${value}'`;
                else if (typeof(value) == "boolean") {
                    if (key.includes("deleted")) {
                        if (value === true) str = `${str} deletedAt IS NOT NULL,`;
                        else str = `${str} deletedAt IS NULL,`;
                    }
                }
            }
        }

        return str;
    }
}
