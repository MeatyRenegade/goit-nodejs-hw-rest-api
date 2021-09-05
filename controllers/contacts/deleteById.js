const { Contact } = require('../../models')

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const selectedContact = await Contact.findByIdAndDelete(contactId)

    if (!selectedContact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json({
      message: 'Contact deleted',
      data: {
        result: selectedContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteById
