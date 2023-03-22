import Joi from "joi";

export const NameSchema = Joi.object({
    first: Joi.string().min(3).max(50).trim(),
    last: Joi.string().min(3).max(50).trim(),
    middle: Joi.string().max(50).trim(),
    preferred: Joi.string().max(50).trim()
})

const genderOptions = ["male", "female", "non-binary", "prefer-not-to-say"] as const 

export const GenderSchema = Joi.string().lowercase().replace(/\s+/, "-").valid(...genderOptions)

export const HumanSchema = Joi.object({
    name: NameSchema,
    age: Joi.date().less("now"),
    gender: GenderSchema
})

export interface NameType {
    first?: string
    last?: string 
    middle?: string
    preferred?: string  
}

export interface Humantype {
    name?: NameType
    age?: typeof Date, 
    gender?: typeof genderOptions[number]
}