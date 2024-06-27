import { DeleteUser } from "./DeleteUser";
import { IDeleteUserDTO } from "./IDeleteUserDTO";

export class DeleteUserUseCase {
    
    constructor (private readonly deleteUser : DeleteUser) {}

    async run(userDto: IDeleteUserDTO) {
        try {
            const res = await this.deleteUser.execute(userDto.id);
            return { message: "User Deleted With Success!", user: res }
        } catch (err) {
            const exception = {
                message: "Operation Error!",
                error: err
            };

            throw new Error(`${exception}`);
        }

    }
}
