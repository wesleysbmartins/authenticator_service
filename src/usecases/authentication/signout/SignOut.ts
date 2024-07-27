import { IUserQueryParams } from "../../../repository/IUserRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";
import { RedisOperations } from "../../../adapters/database/nosql/redisOperations.ts/RedisOperations";

export class SignOut {
    constructor (
        private readonly redis : RedisOperations,
        private readonly userRepository : UserRepository,
    ) {}

    async execute (email: string, token: string) : Promise<string> {
        await this.redis.del(token);
        const user = await this.userRepository.findOne({ email });
        const userToUpdate : IUserQueryParams = {
            id: user.id,
            token: undefined,
            updatedAt: new Date(),
        };

        await this.userRepository.update(userToUpdate);
        return "";
    }
}
