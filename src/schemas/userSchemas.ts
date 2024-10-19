import Joi from "joi";

const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.ref('password')
});

export { registerUserSchema }