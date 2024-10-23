import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { schemaValidation, validTokenMiddleware } from "../middlewares/validationMiddlewares";
import { registerCredentialSchema } from "../schemas/storeSchemas";

const storeRouter = Router();

storeRouter.post("/credential", validTokenMiddleware, schemaValidation(registerCredentialSchema), createCredentialController)

export default storeRouter;