const data = require('../../model/index')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const selectedContact = await data.removeContact(+contactId)
    if (selectedContact === null) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json({
      message: 'Contact deleted',
      data: selectedContact,
    })
  } catch (error) {
    next(error)
  }
  res.json({ message: 'template message' })
}

module.exports = remove
