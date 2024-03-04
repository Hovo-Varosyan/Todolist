const Joi=require('joi')

const schema=Joi.object({
    title:Joi.string()
    .min(1)
    .trim()
    .required(),
    description:Joi.string()
    .min(1)
    .trim()
    .required(),
    status:Joi.boolean(),
    id:Joi.string()
    .min(1)
    .trim()
    .when('$isRecuired',{
       is:true,
        then:Joi.required(),
        otherwise:Joi.optional()
    })
})


module.exports=schema