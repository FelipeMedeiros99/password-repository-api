import { NextFunction, Request, Response } from "express";
import { MessageError } from "../types/errorTypes";


export async function errorHandler(err: MessageError, req: Request, res: Response, next: NextFunction) {
    const message: string = err.message || "Internal server error"
    const status: number = err.status || 500

    try {
        res.status(status).send(err.message);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error")
    }
}