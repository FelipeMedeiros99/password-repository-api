import { Router } from "express";
import { createCredentialController } from "../controllers/storeController";

const storeRouter = Router();

storeRouter.post("/credential", createCredentialController)

export default storeRouter;