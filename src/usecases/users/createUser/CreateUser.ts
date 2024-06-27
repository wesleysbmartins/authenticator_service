import { User } from "../../../entities/User";
import { IUserQueryParams } from "../../../repository/IUserRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";
import { Bcrypt } from "../../../services/bcrypt/Bcrypt";

export class CreateUser {
    
    constructor (
        private readonly usersRepository : UserRepository,
        private readonly bcrypt: Bcrypt,
    ) {}

    async execute (userToCreate : IUserQueryParams) : Promise<User> {
        const queryToSerachUser = {
            email: userToCreate.email,
            isDeleted: false,
        } as IUserQueryParams;

        userToCreate.password = await this.bcrypt.generateHash(userToCreate.password!);
        
        const exists = await this.usersRepository.findAll(queryToSerachUser);
        if (exists.length) throw new Error("This User alreadly exists!");

        const res = await this.usersRepository.create(userToCreate);
        return res;
    }
}
