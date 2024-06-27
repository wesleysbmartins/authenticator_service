import { UserRepository } from "../../../repository/implementations/UserRepository";
import SQL from "../../../services/database/sql/SQL";
import { SqlOperations } from "../../../services/database/sql/sqlOperations/SqlOperations";
import { FindAllUsers } from "./FindAllUsers";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

const sqlOperations = new SqlOperations(new SQL());
const userRepository = new UserRepository(sqlOperations)
const findAllUsers = new FindAllUsers(userRepository)
const findAllUsersUseCase = new FindAllUsersUseCase(findAllUsers);

export default findAllUsersUseCase;
