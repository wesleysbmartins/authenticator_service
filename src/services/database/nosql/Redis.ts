import { createClient } from "redis";
import { IRedis, IRedisCredentials, IRedisClient } from "./IRedis";

export class Redis implements IRedis {
    private static instance : IRedisClient;

    async connect(): Promise<IRedisClient> {
        try {
            if (!Redis.instance) {
                const redisCredentials : IRedisCredentials = {
                    username: process.env.REDIS_USER!,
                    password: process.env.REDIS_PASSWORD!,
                    host: process.env.REDIS_HOST!,
                    port: parseInt(process.env.REDIS_PORT!),
                };
    
                const client = createClient({
                    username: redisCredentials.username,
                    password: redisCredentials.password,
                    socket: {
                        host: redisCredentials.host,
                        port: redisCredentials.port,
                    }
                });
    
                Redis.instance = await client.connect();

                console.log("REDIS CONNECTION SUCCESS!");
            }

            return Redis.instance;
        } catch (err) {
            const error = err as Error;

            throw new Error(`REDIS CONNECTION ERROR\n${error.message}\n${error.stack}`);
        }
    }
}

export default Redis;
