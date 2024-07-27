import { UserRepository } from "../../../repository/implementations/UserRepository";
import Redis from "../../../adapters/database/nosql/Redis";
import { RedisOperations } from "../../../adapters/database/nosql/redisOperations.ts/RedisOperations";
import SQL from "../../../adapters/database/sql/SQL";
import { SqlOperations } from "../../../adapters/database/sql/sqlOperations/SqlOperations";
import { SignOut } from "./SignOut";
import { SignOutUseCase } from "./SignOutUseCase";

const redis = new Redis();
const redisOperations = new RedisOperations(redis);
const sql = new SQL();
const sqlOperations = new SqlOperations(sql);
const userRepository = new UserRepository(sqlOperations);
const signOut = new SignOut(redisOperations, userRepository);
const signOutUseCase = new SignOutUseCase(signOut);

export default signOutUseCase;
