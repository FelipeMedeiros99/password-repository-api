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
        const token = await loginUserService(userData)
        res.status(200).send(token)
    } catch (e) {
        next(e)
    }
}