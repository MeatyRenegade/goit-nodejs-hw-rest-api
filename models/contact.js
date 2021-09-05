const { Schema, model } = require('mongoose')
const Joi = require('Joi')

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Contact email required'],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, 'Contact phone number required'],
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
}
