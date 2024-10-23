import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { schemaValidation, validTitleIsUnique, validTokenMiddleware } from "../middlewares/validationMiddlewares";
import { registerCredentialSchema } from "../schemas/storeSchemas";

const storeRouter = Router();

// urls: "/crendentials" | "/securityNotes" | "/cards" | "/wifi"


storeRouter.post("/credentials", validTokenMiddleware, schemaValidation(registerCredentialSchema), validTitleIsUnique, createCredentialController)

export default storeRouter;