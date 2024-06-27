import { Request, Response } from "express";
import { IFindAllUsersDTO } from "../../usecases/users/findAllUsers/IFindAllUsersDTO";
import findAllUsersUseCase from "../../usecases/users/findAllUsers";

export class FindAllUsersController {
    async handler(req: Request, res: Response) {
        try {
            const { body } = req;

            const { id, name, username, email, createdAt, updatedAt, deletedAt } = body;

            let validParams = false;

            if (id || name || username || email || createdAt || updatedAt || deletedAt) validParams = true;

            let userDTO : IFindAllUsersDTO = {};

            if (id) userDTO.id = id;
            if (name) userDTO.name = name;
            if (username) userDTO.username = username;
            if (email) userDTO.email = email;
            if (createdAt) userDTO.createdAt = createdAt;
            if (updatedAt) userDTO.updatedAt = updatedAt;
            if (deletedAt) userDTO.deletedAt = deletedAt;

            const result = await findAllUsersUseCase.run(validParams ? userDTO : undefined);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
