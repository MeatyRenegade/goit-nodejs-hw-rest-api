const { NotFound } = require('http-errors')

const { User } = require('../../models')

const verifyMail = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.send('<h2>Email verified</h2>')
}

module.exports = verifyMail
