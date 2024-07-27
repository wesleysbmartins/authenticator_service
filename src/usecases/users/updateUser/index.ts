import { UserRepository } from "../../../repository/implementations/UserRepository";
import SQL from "../../../adapters/database/sql/SQL";
import { SqlOperations } from "../../../adapters/database/sql/sqlOperations/SqlOperations";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


const sqlOperations = new SqlOperations(new SQL());
const userRepository = new UserRepository(sqlOperations)
const updateUser = new UpdateUser(userRepository)
const updateUserUseCase = new UpdateUserUseCase(updateUser);

export default updateUserUseCase;
