import { Router, Request, Response } from "express";
import { schemaValidation } from "../middlewares/validationMiddlewares";
import { registerUserSchema } from "../schemas/userSchemas";
import { createUserRepository, findUserReposytory } from "../repositories/userRepository";
import { conflitError } from "../services/customErros";



const userRouter = Router();

userRouter.post("/register", schemaValidation(registerUserSchema), async (req: Request, res: Response)=>{
    let {body: userData} = req;

    const userExist = await findUserReposytory(userData);

    conflitError(Boolean(userExist));
    
    // await createUserRepository(userData);

    res.sendStatus(200);
})

export default userRouter;