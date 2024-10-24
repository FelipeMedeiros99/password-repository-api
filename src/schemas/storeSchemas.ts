import Joi from "joi"


export const registerCredentialSchema = Joi.object({
    title: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(10).required(),
    url: Joi.string().pattern(new RegExp('^(https?|ftp):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$')).required()
})


export const registerSecurityNotesSchema = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required(),
})

export const registerWifiSchema = Joi.object({
    title: Joi.string().required(),
    networkName: Joi.string().required(),
    password: Joi.string().required()
})


export const registerCardsSchema = Joi.object({
    title: Joi.string().required(),
    cardNumber: Joi.string().pattern(/^\d{13,19}$/).required(),
    printedName: Joi.string().required(),
    cvv: Joi.string().pattern(/^\d{3,4}$/).required(),
    expirationDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/(20[2-9][0-9])$/).required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    password: Joi.string().required()
})


// Cards
//     id             Int       @id @default(autoincrement())
//     title          String    @unique
//     cardNumber     String
//     printedName    String
//     cvv            String
//     expirationDate String
//     password       String
//     isVirtual      Boolean
//     type           CardTypes
//     userId         Int