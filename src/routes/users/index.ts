import express from "express";
import { createUserController, deleteUserController, findAllUsersController, updateUserController } from "../../controllers/users";

const router = express.Router();

router.post("/create", createUserController.handler);
router.put("/findAll", findAllUsersController.handler);
router.put("/update", updateUserController.handler);
router.delete("/delete?:id", deleteUserController.handler);

export default router;