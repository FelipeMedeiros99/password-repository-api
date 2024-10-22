import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { validTokenMiddleware } from "../middlewares/validationMiddlewares";

const storeRouter = Router();

storeRouter.post("/credential", validTokenMiddleware, createCredentialController)

export default storeRouter;