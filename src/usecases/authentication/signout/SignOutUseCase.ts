import { ISignOutDTO } from "./ISignOutDTO";
import { SignOut } from "./SignOut";

export class SignOutUseCase {
    constructor (private readonly SignOut : SignOut) {}

    async run(sigOutDto: ISignOutDTO) {
        try {
            const res = await this.SignOut.execute(sigOutDto.email, sigOutDto.token);
            return { message: "User SignOut With Success!", token: res };
        } catch (err) {
            const exception = {
                message: "Error to SignOut!",
                error: err
            };

            throw new Error(`${exception}`);
        }
    }    
}
