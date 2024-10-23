import { findIfTitleExistsRepository } from "../repositories/storeRepository";
import { DecryptedToken } from "../types/storeTypes";
import { PathName } from "../types/userTypes";


export async function findIfTitleExists(pathName:PathName, decryptedToken: DecryptedToken, title: string) {
    const titleExists = await findIfTitleExistsRepository(decryptedToken, pathName, title);
    console.log(titleExists);
}