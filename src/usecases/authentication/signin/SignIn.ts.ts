import { error } from "console";
import { IUserQueryParams } from "../../../repository/IUserRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";
import { Bcrypt } from "../../../services/bcrypt/Bcrypt";
import { JsonWebToken } from "../../../services/jwt/JsonWebToken";
import { IUserJwt } from "../../../services/jwt/IJsonWebToken";
import { RedisOperations } from "../../../services/database/nosql/redisOperations.ts/RedisOperations";

export class SignIn {
    constructor (
        private readonly usersRepository : UserRepository,
        private readonly bcrypt: Bcrypt,
        private readonly jwt : JsonWebToken,
        private readonly redis : RedisOperations,
    ) {}

    async execute (email: string, password: string) : Promise<string> {
        const queryToSearchUser = {
            email: email,
            isDeleted: false,
        } as IUserQueryParams;
        
        const user = await this.usersRepository.findOne(queryToSearchUser);
        const isValid = await this.bcrypt.compareHash(password, user.password!);

        if (!isValid) throw new Error("Incorrect Email or Password!");

        const userJwt : IUserJwt = {
            id: user.id!,
            email: user.email!,
        };

        const token = this.jwt.generateToken(userJwt);

        const queryToUpdateUser : IUserQueryParams = {
            id: user.id,
            token: token,
        };

        await this.usersRepository.update(queryToUpdateUser);
        await this.redis.set(token, user);

        return token;
    }
}
