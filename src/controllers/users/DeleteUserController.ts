import { Request, Response } from "express";
import deleteUserUseCase from "../../usecases/users/deleteUser";
import { IDeleteUserDTO } from "../../usecases/users/deleteUser/IDeleteUserDTO";

export class DeleteUserController {
    async handler(req: Request, res: Response) {
        try {
            const { query } = req;

            const { id } = query;

            if (!id) throw new Error("Param Id Expected And Not Found!");

            var userDTO : IDeleteUserDTO = {
                id: id as string,
            };

            const result = await deleteUserUseCase.run(userDTO);
            res.status(200).send(result);
        } catch (err) {
            const error = {
                message: (err as Error).message,
            };

            res.status(500).send({ error });
        }
    }
}
