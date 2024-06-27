import { Request, Response } from "express";
import { IUpdateUserDTO } from "../../usecases/users/updateUser/IUpdateUserDTO";
import updateUserUseCase from "../../usecases/users/updateUser";

export class UpdateUserController {
    async handler(req: Request, res: Response) {
        try {
            const { body } = req;

            const { id, name, username, email, password } = body;

            if (!id) throw new Error("Id Parameter Expected And Not Found!");

            if (!name && !username && !email && !password) throw new Error("Update Parameters Expected And Not Found!");

            var userDTO : IUpdateUserDTO = {
                id: id,
            };

            if (name) userDTO.name = name;
            if (username) userDTO.username = username;
            if (email) userDTO.email = email;

            const result = await updateUserUseCase.run(userDTO);
            res.status(200).send(result);
        } catch (err) {
            const error = {
                message: (err as Error).message,
            };

            res.status(500).send({ error });
        }
    }
}
