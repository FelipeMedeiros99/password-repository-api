import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";
import { schemaValidation, validTitleIsUniqueMiddleware, validTokenMiddleware } from "../middlewares/validationMiddlewares";
import { registerCardsSchema, registerCredentialSchema, registerSecurityNotesSchema, registerWifiSchema } from "../schemas/storeSchemas";
import { getAllDataController } from "../controllers/userController";

const storeRouter = Router();

// urls: "/crendentials" | "/securityNotes" | "/cards" | "/wifi"


storeRouter.post("/credentials", validTokenMiddleware, schemaValidation(registerCredentialSchema), validTitleIsUniqueMiddleware, createCredentialController)
storeRouter.post("/securityNotes", validTokenMiddleware, schemaValidation(registerSecurityNotesSchema), validTitleIsUniqueMiddleware, createCredentialController)
storeRouter.post("/cards", validTokenMiddleware, schemaValidation(registerCardsSchema), validTitleIsUniqueMiddleware, createCredentialController)
storeRouter.post("/wifi", validTokenMiddleware, schemaValidation(registerWifiSchema), validTitleIsUniqueMiddleware, createCredentialController)


storeRouter.get("/credentials", validTokenMiddleware, getAllDataController)
storeRouter.get("/securityNotes", validTokenMiddleware, getAllDataController)
storeRouter.get("/cards", validTokenMiddleware, getAllDataController)
storeRouter.get("/wifi", validTokenMiddleware, getAllDataController)


storeRouter.get("/credentials/:id", validTokenMiddleware, getAllDataController)
storeRouter.get("/securityNotes/:id", validTokenMiddleware, getAllDataController)
storeRouter.get("/cards/:id", validTokenMiddleware, getAllDataController)
storeRouter.get("/wifi/:id", validTokenMiddleware, getAllDataController)


export default storeRouter;