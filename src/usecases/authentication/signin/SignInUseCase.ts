import { ISignInDTO } from "./ISignInDTO";
import { SignIn } from "./SignIn.ts";

export class SignInUseCase {
    constructor (private readonly signIn : SignIn) {}

    async run(sigInDto: ISignInDTO) {
        try {
            const res = await this.signIn.execute(sigInDto.email, sigInDto.password);
            return { message: "User Signned With Success!", token: res };
        } catch (err) {
            const exception = {
                message: "Error to SignIn!",
                error: err
            };

            throw new Error(`${exception}`);
        }

    }    
}
