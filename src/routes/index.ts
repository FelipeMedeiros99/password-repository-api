import { Router } from "express";
import userRouter from "./userRouter";
import { errorHandler } from "../middlewares/errorHandler.js";

const router = Router();

router.use(userRouter);
router.use(errorHandler);

export default router;