export interface IRedisClient {
    set(key: string, value: string) : Promise<any>;
    get(key: string) : Promise<any>;
    del(key: string) : Promise<any>;
}

export interface IRedis {
    connect() : Promise<IRedisClient>;
}

export interface IRedisCredentials {
    port: number;
    host: string;
    username: string;
    password: string;
}
