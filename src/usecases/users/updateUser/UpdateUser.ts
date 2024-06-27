import { User } from "../../../entities/User";
import { IUserQueryParams } from "../../../repository/IUserRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";

export class UpdateUser {
    
    constructor (private readonly usersRepository : UserRepository) {}

    async execute (userToUpdate: IUserQueryParams) : Promise<User> {

        const res = await this.usersRepository.update(userToUpdate);

        return res;
    }
}
