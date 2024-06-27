import { UserRepository } from "../../../repository/implementations/UserRepository";
import { Bcrypt } from "../../../services/bcrypt/Bcrypt";
import SQL from "../../../services/database/sql/SQL";
import { SqlOperations } from "../../../services/database/sql/sqlOperations/SqlOperations";
import { CreateUser } from "./CreateUser";
import { CreateUserUseCase } from "./CreateUserUseCase";

const bcrypt = new Bcrypt();
const sqlOperations = new SqlOperations(new SQL());
const userRepository = new UserRepository(sqlOperations);
const createUser = new CreateUser(userRepository, bcrypt);
const createUserUseCase = new CreateUserUseCase(createUser);

export default createUserUseCase;
