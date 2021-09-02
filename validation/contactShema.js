const Joi = require('joi')

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/)
    .required(),
})

module.exports = joiContactSchema
