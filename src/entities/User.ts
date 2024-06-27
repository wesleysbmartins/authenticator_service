export class User {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(id?: string, name?: string, username?: string, email?: string, password?: string, token?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.token = token;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
