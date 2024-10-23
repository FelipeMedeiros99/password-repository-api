import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { schemaValidation, validTitleIsUniqueMiddleware, validTokenMiddleware } from "../middlewares/validationMiddlewares";
import { registerCredentialSchema } from "../schemas/storeSchemas";

const storeRouter = Router();

// urls: "/crendentials" | "/securityNotes" | "/cards" | "/wifi"


storeRouter.post("/credentials", validTokenMiddleware, schemaValidation(registerCredentialSchema), validTitleIsUniqueMiddleware, createCredentialController)

export default storeRouter;