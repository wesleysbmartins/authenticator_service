import { FindAllUsers } from "./FindAllUsers";
import { IFindAllUsersDTO } from "./IFindAllUsersDTO";

export class FindAllUsersUseCase {
    
    constructor (private readonly findAllUsers : FindAllUsers) {}

    async run(userDto?: IFindAllUsersDTO) {
        try {
            const res = await this.findAllUsers.execute(userDto);
            return { rows: res.length, users: res }
        } catch (err) {
            const exception = {
                message: "Operation Error!",
                error: err
            };

            throw new Error(`${exception}`);
        }

    }
}