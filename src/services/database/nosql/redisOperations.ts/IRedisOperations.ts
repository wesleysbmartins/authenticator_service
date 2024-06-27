export interface IRedisOperations {
    set (key: string, value: {}) : Promise<any>;
    get (key: string) : Promise<any>;
    del (key: string) : Promise<any>;
}
