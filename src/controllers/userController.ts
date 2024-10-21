import { Request, Response, NextFunction } from "express";
import { createUserRepository, findUserReposytory } from "../repositories/userRepository";
import { conflitErrorService } from "../services/customErrosService";
import { encryptPasswordService } from "../services/userServices";

export async function registerController(req: Request, res: Response, next: NextFunction){
    const { body: userData } = req;
    try{

        const userExistAtDatabase = await findUserReposytory(userData);
        
        conflitErrorService(userExistAtDatabase);
        
        const encryptedPassword = await encryptPasswordService(userData.password)
        
        delete userData.passwordConfirmation
        
        await createUserRepository({ ...userData, password: encryptedPassword });
        res.sendStatus(201);
    }catch(e){
        next(e)
    }
}