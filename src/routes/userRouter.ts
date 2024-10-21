import { Router } from "express";
import { schemaValidation } from "../middlewares/validationMiddlewares";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchemas";
import { loginController, registerController } from "../controllers/userController";



const userRouter = Router();

userRouter.post("/register", schemaValidation(registerUserSchema), registerController)
userRouter.post("/login", schemaValidation(loginUserSchema), loginController)

export default userRouter;