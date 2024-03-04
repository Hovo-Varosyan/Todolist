const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z ]+$'))
        .trim()
        .when('$isRequired', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    password: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(8)
        .email()
        .required(),
})

module.exports = schema