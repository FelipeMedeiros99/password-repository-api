import { Request, Response, NextFunction } from "express";
import { loginUserService, registerUserService } from "../services/userServices";
import { UserDataReceived } from "../types/userTypes";

export async function registerController(req: Request, res: Response, next: NextFunction) {
    const userData: UserDataReceived = req.body;
    try {

        await registerUserService(userData)
        res.sendStatus(201);

    } catch (e) {
        next(e)
    }
}


export async function loginController(req: Request, res: Response, next: NextFunction) {
    const userData: UserDataReceived = req.body;
    try {
        await loginUserService(userData)
        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}