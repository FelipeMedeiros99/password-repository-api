import { Router} from "express";
import { schemaValidation } from "../middlewares/validationMiddlewares";
import { registerUserSchema } from "../schemas/userSchemas";
import { registerController } from "../controllers/userController";



const userRouter = Router();

userRouter.post("/register", schemaValidation(registerUserSchema), registerController)

export default userRouter;