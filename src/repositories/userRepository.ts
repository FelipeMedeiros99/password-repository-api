import prisma from "../config";
import { UserDataReceived } from "../types/userTypes";

export async function createUserRepository(userData: UserDataReceived) {
    await prisma.user.create({data: userData})
}