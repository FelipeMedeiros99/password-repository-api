import { findIfTitleExistsRepository, saveStoreRepository } from "../repositories/storeRepository";
import { MessageError } from "../types/errorTypes";
import { CredentialReceived, DecryptedToken, EntityName } from "../types/storeTypes";
import { PathName } from "../types/userTypes";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

export async function validIfTitleExistsService(pathName: PathName, decryptedToken: DecryptedToken, title: string) {
    const titleExists = await findIfTitleExistsRepository(decryptedToken, pathName, title);

    if (titleExists) {
        const messageError: MessageError = { message: "this title already exists", status: 409 }
        throw messageError;
    }
}

export async function encryptPasswordStoreService(password: string){
    const cryptrKey = process.env.CRYPTR_kEY as string;
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
