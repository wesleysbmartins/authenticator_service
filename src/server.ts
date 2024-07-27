import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import { SQL } from "./adapters/database/sql/SQL";
import sqlMigration from "./migrations";
import { Redis } from "./adapters/database/nosql/Redis";

dotenv.config();

const port = parseInt(`${process.env.PORT || 3000}`);

const app = express();

app.use(express.json())

app.use(cors());

app.use(helmet());

app.use(router);

const database = new SQL();
database.connect();
sqlMigration.run();

const redis = new Redis();
redis.connect();

app.listen(port, () => console.log(`Server Running on PORT: ${port}.`));
