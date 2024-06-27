import { UserRepository } from "../../../repository/implementations/UserRepository";
import SQL from "../../../services/database/sql/SQL";
import { SqlOperations } from "../../../services/database/sql/sqlOperations/SqlOperations";
import { DeleteUser } from "./DeleteUser";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const sqlOperations = new SqlOperations(new SQL());
const userRepository = new UserRepository(sqlOperations)
const deleteUser = new DeleteUser(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(deleteUser);

export default deleteUserUseCase;
