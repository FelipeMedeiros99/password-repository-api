import prisma from "../config";
import { UserDataReceived } from "../types/userTypes";

export async function createUser(userData: UserDataReceived) {
    await prisma.user.create({data: userData})
}