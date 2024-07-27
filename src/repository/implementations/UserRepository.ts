import { User } from "../../entities/User";
import { SqlOperations } from "../../adapters/database/sql/sqlOperations/SqlOperations";
import { IUserQueryParams, IUserRepository } from "../IUserRepository";

enum Separetor {
    AND = " AND",
    COMMA = ","
}

export class UserRepository implements IUserRepository {

    constructor (private readonly sql : SqlOperations<User>) {}

    async findAll(params?: IUserQueryParams | undefined): Promise<User[]> {

        const schema = process.env.DB_SCHEMA;

        let query = `SELECT * FROM ${schema}.users`;

        try {
            if (params) query = `${query} WHERE ${this.handleParams(params, Separetor.AND)}`;
            const result = await this.sql.rawQuery(query);
            return result as User[];
        } catch (err) {
            const message = `SQL ERROR ${err}`;
            console.log(message);
            throw new Error (message);
        }
    }

    async findOne(params: IUserQueryParams): Promise<User> {
        const schema = process.env.DB_SCHEMA;

        let query = `SELECT * FROM ${schema}.users`;

        try {
            query = `${query} WHERE ${this.handleParams(params, Separetor.AND)}`;
            const result = await this.sql.rawQuery(query);
            const data = result[0];
            return data as User;
        } catch (err) {
            const message = `SQL ERROR ${err}`;
            console.log(message);
            throw new Error (message);
        }
    }

    async create(params: IUserQueryParams | undefined): Promise<User> {
        const date = new Date().toISOString();
        const schema = process.env.DB_SCHEMA;

        const query = `INSERT INTO ${schema}.users (name, username, email, password, createdAt, updatedAt)
        VALUES ('${params!.name}', '${params!.username}', '${params!.email}', '${params!.password}', '${date}', '${date}')`;

        try {
            const result = await this.sql.rawQuery(query);
            return result as User;
        } catch (err) {
            const message = `SQL ERROR ${err}`;
            console.log(message);
            throw new Error (message);
        }
    }

    async update(params: IUserQueryParams): Promise<User> {
        const schema = process.env.DB_SCHEMA;

        let query = `UPDATE ${schema}.users`;

        try {
            query = `${query} SET ${this.handleParams(params, Separetor.COMMA)} WHERE id = '${params!.id}';`;
            const result = await this.sql.rawQuery(query);
            return result as User;
        } catch (err) {
            const message = `SQL ERROR ${err}`;
            console.log(message);
            throw new Error (message);
        }
    }

    async delete(id: string): Promise<User> {
        const schema = process.env.DB_SCHEMA;

        const query = `UPDATE ${schema}.users SET deletedAt = '${new Date().toISOString()}' WHERE id = '${id}';`;

        try {
            const result = await this.sql.rawQuery(query);
            return result as User;
        } catch (err) {
            const message = `SQL ERROR ${err}`;
            console.log(message);
            throw new Error (message);
        }
    }

    handleParams(params: IUserQueryParams, separetor: string): string {
        let str = "";

        for (const [key, value] of Object.entries(params)) {
            if (key !== "id" && value) {
                if (typeof(value) == "string") str = `${str} ${key} = '${value}'${separetor}`;
                else if (typeof(value) == "number") str = `${str} ${key} = ${value}${separetor}`;
                else if (value instanceof Date) str = `${str} ${key} = '${value.toISOString()}'${separetor}`;
                else if (typeof(value) == "boolean") {
                    if (key.includes("isDeleted")) {
                        if (value === true) str = `${str} deletedAt IS NOT NULL,`;
                        else str = `${str} deletedAt IS NULL,`;
                    }
                }
            }
        }

        let strParams = "";

        for (let i = 0; i < str.length - separetor.length; i++) {
            const value = str[i];
            strParams = `${strParams}${value}`;
        }

        return strParams;
    }
    
}