import { title } from "process";
import prisma from "../config";
import { CredentialReceived, DecryptedToken, EntityName, ReceivedDataStore } from "../types/storeTypes";
import { PathName, UserDataReceived } from "../types/userTypes";
import { encryptPasswordStoreService } from "../services/storeServices";


export async function findTokenInDatabase(token: string) {
    const tokenWithoutBearer = token.replace("Bearer", "").trim()
    const tokenData = await prisma.token.findFirst({ where: { token: tokenWithoutBearer } });
    return tokenData;
}

export async function findIfTitleExistsRepository(decryptedToken: DecryptedToken, pathName: PathName, title: string) {

    const { id } = decryptedToken;
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

    if ("password" in receivedData) {
        const encryptedPassword = await encryptPasswordStoreService(receivedData.password);
        receivedData.password = encryptedPassword;
    }

    if ("cvv" in receivedData) {
        const cvv = await encryptPasswordStoreService(receivedData.cvv);
        receivedData.cvv = cvv
    }

    await (prisma[entityName] as any).create({
        data: { ...receivedData, userId: tokenData.id }
    })
}

export async function findAllDataRepository(decryptedToken: DecryptedToken, url: PathName, dataId: string | undefined = undefined) {
    let entityName = url.replace("/", "") as EntityName;
    console.log(entityName)
    if (dataId) {
        entityName = entityName.split("/")[0].trim() as EntityName

        const data = await (prisma[entityName] as any).findFirst({
            where: {
                userId: decryptedToken.id,
                id: Number(dataId)
            }
        })
        return data
    } else {
        const data = await (prisma[entityName] as any).findMany({
            where: {
                userId: decryptedToken.id
            }
        })
        return data;
    }


}

export async function deleteDataRepository(decryptedToken: DecryptedToken, url: PathName, dataId: string) {
    const entityName = url.replace("/", "").split('/')[0] as EntityName;
    console.log(entityName)

    const data = await prisma.credentials.delete({
        where: {
            userId: decryptedToken.id,
            id: Number(dataId)
        }
    })
    console.log(data)


    // const data = await (prisma[entityName] as any).deleteMany({
    //     where: {
    //         userId: decryptedToken.id,
    //         id: Number(dataId)
    //     }
    // })

    console.log(data)
    return data;

}