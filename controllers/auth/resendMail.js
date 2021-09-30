const { User } = require('../../models')
const { sendMail } = require('../../utils')
const { BadRequest } = require('http-errors')

const resendMail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const { verificationToken } = user

  if (!email) {
    throw new BadRequest('Missing required field email')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const emailData = {
    to: email,
    subject: 'Email verification',
    html: `<strong><a href="http://localhost:4000/api/v1/users/verify/${verificationToken}">Confirm your email address</a></strong>`,
  }
  await sendMail(emailData)

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  })
}

module.exports = resendMail
