import { CreateUserController } from "./CreateUserController";
import { DeleteUserController } from "./DeleteUserController";
import { FindAllUsersController } from "./FindAllUsersController";
import { UpdateUserController } from "./UpdateUserController";

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

export {
    createUserController,
    findAllUsersController,
    updateUserController,
    deleteUserController,
};
