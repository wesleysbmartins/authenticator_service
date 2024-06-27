import express from "express";
import healthCheck from "./healthcheck";
import users from "./users"
import authentication from "./authentication"

const router = express.Router();

router.use("/", healthCheck);

router.use("/users", users);
router.use("/authentication", authentication);

export default router;
