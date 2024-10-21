import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { createUserRepository, findUserReposytory } from "../repositories/userRepository";
import { conflitErrorService } from "./validationsService";
import { UserDataReceived } from "../types/userTypes";


dotenv.config()

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
    
    console.log(userDatabase)

}
