import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config()

export async function encryptPasswordService(password:string){
    const saltRounds:number = Number(process.env.SALTS);
    
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    return encryptedPassword;

}