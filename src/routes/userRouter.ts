import { Router, Request, Response } from "express";
import { schemaValidation } from "../middlewares/validationMiddlewares";
import { registerUserSchema } from "../schemas/userSchemas";
import { createUserRepository, findUserReposytory } from "../repositories/userRepository";
import { conflitError } from "../services/customErros";
import { encryptPasswordService } from "../services/userServices";



const userRouter = Router();

userRouter.post("/register", schemaValidation(registerUserSchema), async (req: Request, res: Response)=>{
    const {body: userData} = req;

    const userExist = await findUserReposytory(userData);

    conflitError(Boolean(userExist));
        
    const encryptedPassword = await encryptPasswordService(userData.password)
    
    delete userData.passwordConfirmation

    await createUserRepository({...userData, password: encryptedPassword});

    res.sendStatus(201);
})

export default userRouter;