import { Request, Response } from "express";
import signOutUseCase from "../../usecases/authentication/signout";
import { ISignOutDTO } from "../../usecases/authentication/signout/ISignOutDTO";

export class SignOutController {
    async handler(req: Request, res: Response) {
        try {
            const { body } = req;

            const { authorization } = req.headers;

            const { email } = body;

            if (!email) throw new Error(`Parameter Email Expected and Not Found!`);
            if (!authorization) throw new Error(`Parameter Authorization Expected and Not Found!`);

            const SignOutDTO : ISignOutDTO = {
                email: email,
                token: authorization as string,
            };

            const result = await signOutUseCase.run(SignOutDTO);
            res.status(200).send(result);
        } catch (err) {
            const error = {
                message: (err as Error).message,
            };

            res.status(500).send({ error });
        }
    }
}