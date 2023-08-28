import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})

export const transactionSchema = joi.object({
    value: joi.number().positive().required(),
    email: joi.string().email().required(),
    description: joi.string().required(),
    type: joi.string().required().valid("entry", "exit")
})