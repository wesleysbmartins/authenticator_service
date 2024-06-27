import express from "express";
import { signInController, signOutController } from "../../controllers/authentication";

const router = express.Router();

router.post("/signin", signInController.handler);
router.post("/signout", signOutController.handler);

export default router;
