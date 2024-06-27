import { User } from "../entities/User";

export interface IUserQueryParams {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

export interface IUserRepository {
    findAll(params?: IUserQueryParams) : Promise<User[]>;
    findOne(params: IUserQueryParams) : Promise<User>;
    create(params: IUserQueryParams) : Promise<User>;
    update(params: IUserQueryParams) : Promise<User>;
    delete(id: string) : Promise<User>;
    handleParams(params: IUserQueryParams, separetor: string) : string;
}
