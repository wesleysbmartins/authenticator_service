import { CreateUser } from "./CreateUser";
import { ICreateUserDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
    
    constructor (private readonly createUser : CreateUser) {}

    async run(userDto: ICreateUserDTO) {
        try {
            const res = await this.createUser.execute(userDto);
            return { message: "User Created With Success!", user: res }
        } catch (err) {
            const exception = {
                message: "User Not Created!",
                error: err
            };

            throw new Error(`${exception}`);
        }

    }
}