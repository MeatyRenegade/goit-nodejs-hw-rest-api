const data = require('../../model')
const { contactSchema } = require('../../validation')

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        message: 'missing fields',
      })
    }

    const { contactId } = req.params
    const updatedContact = await data.updateContact(contactId, req.body)

    if (!updatedContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: updatedContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
