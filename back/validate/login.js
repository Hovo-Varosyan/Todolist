const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
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
        .email({ minDomainSegments: 2 })
        .required(),
})

module.exports=schema