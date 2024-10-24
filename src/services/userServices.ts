import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { createUserRepository, findUserReposytory, saveTokenRepository } from "../repositories/userRepository";
import { conflitErrorService, validationDatasService } from "./validationsService";
import { SaveToken, UserDataReceived } from "../types/userTypes";
import { Token, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { MessageError } from "../types/errorTypes";
import { DecryptedToken } from "../types/storeTypes";
import Cryptr from "cryptr";

dotenv.config();


async function createToken(userDatabase: User) {
    const payload = { id: userDatabase.id, email: userDatabase.email };
    const JWT_KEY = process.env.JWT_KEY;

    if (!JWT_KEY) {
        const messageError: MessageError = { message: "invalid JWT_KEY", status: 500 }
        throw messageError;
    }

    const token = jwt.sign(payload, JWT_KEY);

    return token;

}

export async function encryptPasswordService(password: string) {
    const saltRounds: number = Number(process.env.SALTS);

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    return encryptedPassword;
}

export async function encryptPasswordStoreService(password: string){
    const cryptrKey = process.env.CRYPTR_KEY as string; 
    const cryptr = new Cryptr(cryptrKey)
    const encryptedPassword =  cryptr.encrypt(password);
   
    return(encryptedPassword);
}

export async function decryptPasswordStoreService(password: string){
    const cryptrKey = process.env.CRYPTR_KEY as string; 
    const cryptr = new Cryptr(cryptrKey)
    const decryptedPassword =  cryptr.decrypt(password);
    return decryptedPassword;
}


export async function decryptToken(token: string):Promise<DecryptedToken>{
    const JWT_KEY = process.env.JWT_KEY;
    if (!JWT_KEY) {
        const messageError: MessageError = { message: "invalid JWT_KEY", status: 500 }
        throw messageError;
    }   
    const tokenWithoutBearer = token.replace("Bearer", "").trim();
    const decryptedToken = jwt.verify(tokenWithoutBearer, JWT_KEY) as DecryptedToken;
    return decryptedToken;
}

export async function registerUserService(userData: UserDataReceived) {
    const userExistAtDatabase = await findUserReposytory(userData);

    conflitErrorService(userExistAtDatabase);

    const encryptedPassword = await encryptPasswordService(userData.password)

    delete userData.passwordConfirmation

    await createUserRepository({ ...userData, password: encryptedPassword });
}

export async function loginUserService(userData: UserDataReceived) {
    const userDatabase = await findUserReposytory(userData);

    await validationDatasService(userDatabase, userData);

    const token = await createToken(userDatabase as User);

    const userDataToken: SaveToken = {
        token: token,
        userId: userDatabase!.id,
        expiration: new Date(Date.now() + 15 * 60 * 1000)
    };
    await saveTokenRepository(userDataToken);

    return token;
}
