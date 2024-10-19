import { NextFunction, Request, Response } from "express";

interface Error {
    message: string;
    status: number;
};

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    try {
        res.status(err.status).send(err.message);
    }catch(e){
        console.log(e);
        res.send("Internal server error").status(500)
    }
}