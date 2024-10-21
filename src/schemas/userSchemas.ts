import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('password'))
});


export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})
