import { Request, Response } from "express";
import { ICreateUserDTO } from "../../usecases/users/createUser/ICreateUserDTO";
import createUserUseCase from "../../usecases/users/createUser";

export class CreateUserController {
    async handler(req: Request, res: Response) {
        try {
            const { body } = req;

            const { name, username, email, password } = body;

            if (!name) throw new Error(`Invalid NAME: ${name}`);
            if (!username) throw new Error(`Invalid USERNAME: ${username}`);
            if (!email) throw new Error(`Invalid EMAIL: ${email}`);
            if (!password) throw new Error(`Invalid PASSWORD: ${password}`);

            const userDTO : ICreateUserDTO = {
                name: name,
                username: username,
                email: email,
                password: password,
            };

            const result = await createUserUseCase.run(userDTO);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
