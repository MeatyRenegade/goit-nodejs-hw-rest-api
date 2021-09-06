const { Contact } = require('../../models')

const updateFav = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  if (!favorite) {
    return res.status(400).json({
      message: 'missing field favorite',
    })
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  )

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

module.exports = updateFav
