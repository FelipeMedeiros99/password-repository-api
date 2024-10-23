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