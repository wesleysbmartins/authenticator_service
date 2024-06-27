import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/healthCheck",(req: Request, res: Response, next: NextFunction) => {
    res.send("Winter is Comming!")
});

export default router;
