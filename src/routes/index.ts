import { Router } from "express";
import userRouter from "./userRouter";
import storeRouter from "./storeRouter";

const router = Router();

router.use(userRouter);
router.use(storeRouter);

export default router;