import { findIfTitleExistsRepository, saveStoreRepository } from "../repositories/storeRepository";
import { MessageError } from "../types/errorTypes";
import { CredentialReceived, DecryptedToken, EntityName, SavedData } from "../types/storeTypes";
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

export function encryptPasswordStoreService(password: string) {
    const cryptrKey = process.env.CRYPTR_kEY as string;
    const cryptr = new Cryptr(cryptrKey)
    const encryptedPassword = cryptr.encrypt(password);

    return (encryptedPassword);
}

export function decryptPasswordStoreService(password: string) {
    const cryptrKey = process.env.CRYPTR_kEY as string;
    const cryptr = new Cryptr(cryptrKey)
    const decryptedPassword = cryptr.decrypt(password);
    return decryptedPassword;
}

export function decryptArrayData(data: SavedData[] | SavedData) {
    const dataIsArray = Array.isArray(data);
    if (dataIsArray) {
        const decryptedData = data.map((cryptedData) => {
            if ("password" in cryptedData) {
                cryptedData.password = decryptPasswordStoreService(cryptedData.password)
            }
            if ("cvv" in cryptedData) {
                cryptedData.cvv = decryptPasswordStoreService(cryptedData.cvv)
            }
            return cryptedData
        })
        return decryptedData;
    } else {

        if ("password" in data) {
            data.password = decryptPasswordStoreService(data.password)
        }
        if ("cvv" in data) {
            data.cvv = decryptPasswordStoreService(data.cvv)
        }
        return data
    }
}