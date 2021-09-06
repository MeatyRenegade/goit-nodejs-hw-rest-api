const { Contact } = require('../../models')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

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
}

module.exports = updateById
