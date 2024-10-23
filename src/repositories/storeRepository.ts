import { title } from "process";
import prisma from "../config";
import { CredentialReceived, DecryptedToken, EntityName, ReceivedDataStore } from "../types/storeTypes";
import { PathName, UserDataReceived } from "../types/userTypes";
import { encryptPasswordService } from "../services/userServices";

export async function findTokenInDatabase(token: string) {
    const tokenWithoutBearer = token.replace("Bearer", "").trim()
    const tokenData = await prisma.token.findFirst({ where: { token: tokenWithoutBearer } });
    return tokenData;
}


export async function findIfTitleExistsRepository(decryptedToken: DecryptedToken, pathName: PathName, title: string){

    const {id} = decryptedToken;
    const entityName = pathName.replace("/", "") as any;

    const titleExists = await (prisma[entityName] as any).findFirst({
        where: {
            userId: id,
            title
        }
    }) 

    return titleExists;

}


export async function saveStoreRepository(tokenData: DecryptedToken, url: PathName, receivedData: ReceivedDataStore) {
    const entityName = url.replace("/", "") as EntityName;

    if("password" in receivedData){
        const encryptedPassword = await encryptPasswordService(receivedData.password);
        receivedData.password = encryptedPassword;
    }

    await (prisma[entityName] as any).create({
        data: {...receivedData, userId: tokenData.id}
    })
}