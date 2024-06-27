import { IUpdateUserDTO } from "./IUpdateUserDTO";
import { UpdateUser } from "./UpdateUser";


export class UpdateUserUseCase {
    
    constructor (private readonly updateUser : UpdateUser) {}

    async run(userDto: IUpdateUserDTO) {
        try {
            const res = await this.updateUser.execute(userDto);
            return { message: "User Updated With Success!", user: res }
        } catch (err) {
            const exception = {
                message: "Operation Error!",
                error: err
            };

            throw new Error(`${exception}`);
        }

    }
}