import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { createUserRepository, findUserReposytory } from "../repositories/userRepository";
import { conflitErrorService, ValidationDatasService } from "./validationsService";
import { UserDataReceived } from "../types/userTypes";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { MessageError } from "../types/errorTypes";

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

export async function registerUserService(userData: UserDataReceived) {
    const userExistAtDatabase = await findUserReposytory(userData);

    conflitErrorService(userExistAtDatabase);

    const encryptedPassword = await encryptPasswordService(userData.password)

    delete userData.passwordConfirmation

    await createUserRepository({ ...userData, password: encryptedPassword });
}

export async function loginUserService(userData: UserDataReceived) {
    const userDatabase = await findUserReposytory(userData);

    await ValidationDatasService(userDatabase, userData)

    createToken(userDatabase as User)
}
