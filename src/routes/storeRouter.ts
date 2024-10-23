import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { schemaValidation, validTitleIsUniqueMiddleware, validTokenMiddleware } from "../middlewares/validationMiddlewares";
import { registerCredentialSchema, registerSecurityNotesSchema } from "../schemas/storeSchemas";

const storeRouter = Router();

// urls: "/crendentials" | "/securityNotes" | "/cards" | "/wifi"


storeRouter.post("/credentials", validTokenMiddleware, schemaValidation(registerCredentialSchema), validTitleIsUniqueMiddleware, createCredentialController)
storeRouter.post("/securityNotes", validTokenMiddleware, schemaValidation(registerSecurityNotesSchema), validTitleIsUniqueMiddleware, createCredentialController)

export default storeRouter;