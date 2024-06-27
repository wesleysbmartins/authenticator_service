import { Request, Response } from "express";
import { ISignInDTO } from "../../usecases/authentication/signin/ISignInDTO";
import signInUseCase from "../../usecases/authentication/signin";

export class SignInController {
    async handler(req: Request, res: Response) {
        try {
            const { body } = req;

            const { email, password } = body;

            if (!email) throw new Error(`Parameter Email Expected and Not Found!`);
            if (!password) throw new Error(`Parameter Password Expected and Not Found!`);

            const signInDTO : ISignInDTO = {
                email: email,
                password: password,
            };

            const result = await signInUseCase.run(signInDTO);
            res.status(200).send(result);
        } catch (err) {
            const error = {
                message: (err as Error).message,
            };

            res.status(500).send({ error });
        }
    }
}
