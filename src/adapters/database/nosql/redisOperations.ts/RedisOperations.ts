import { Redis } from "../Redis";
import { IRedisOperations } from "./IRedisOperations";

export class RedisOperations implements IRedisOperations {

    constructor (private readonly redis : Redis) {}

    async set(key: string, value: {}): Promise<any> {
        try {
            const client = await this.redis.connect();

            const res = await client.set(key, JSON.stringify(value));
            return res;
        } catch (err) {
            throw new Error("Error to SET value to REDIS!");
        }
    }
    
    async get(key: string): Promise<any> {
        try {
            const client = await this.redis.connect();

            const res = await client.get(key);
            return res;
        } catch (err) {
            throw new Error("Error to GET value from REDIS!");
        }
    }

    async del(key: string): Promise<any> {
        try {
            const client = await this.redis.connect();

            const res = await client.del(key);
            return res;
        } catch (err) {
            throw new Error("Error to DEL value from REDIS!");
        }
    }
    
}