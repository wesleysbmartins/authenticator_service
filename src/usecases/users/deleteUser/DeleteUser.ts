import { User } from "../../../entities/User";
import { UserRepository } from "../../../repository/implementations/UserRepository";

export class DeleteUser {
    
    constructor (private readonly usersRepository : UserRepository) {}

    async execute (id: string) : Promise<User> {

        const res = await this.usersRepository.delete(id);

        return res;
    }
}
