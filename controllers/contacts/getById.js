const data = require('../../model/index')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const selectedContact = await data.getContactById(+contactId)
    if (selectedContact === null) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: selectedContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
