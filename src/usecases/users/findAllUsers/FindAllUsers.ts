import { User } from "../../../entities/User";
import { IUserQueryParams } from "../../../repository/IUserRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";

export class FindAllUsers {
    
    constructor (private readonly usersRepository : UserRepository) {}

    async execute (userToFind?: IUserQueryParams) : Promise<User[]> {

        const res = await this.usersRepository.findAll(userToFind);

        return res;
    }
}