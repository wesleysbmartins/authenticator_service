export interface ISqlOperations<T> {
    select (tableName: string, where: IWhere<T>) : Promise<T>;
    insert (tableName: string, values: {}) : Promise<T>;
    update (tableName: string, set: {}, where: IWhere<T>) : Promise<T>;
    delete (tableName: string, where: IWhere<T>) : Promise<T>;
    rawQuery(query: string) : Promise<T[]>;
}

export interface IWhere<T> {
    op?: WHEREOP,
    params?: T,
};

export enum WHEREOP {
    AND = "AND",
    OR = "OR",
    IS = "IS"
};
