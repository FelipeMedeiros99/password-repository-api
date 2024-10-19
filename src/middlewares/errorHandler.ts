import { NextFunction, Request, Response } from "express";
import { MessageError } from "../types/errorTypes";


export async function errorHandler(err: MessageError, req: Request, res: Response, next: NextFunction) {
    try {
        res.status(err.status).send(err.message);
    }catch(e){
        console.log(e);
        res.send("Internal server error").status(500)
    }
}