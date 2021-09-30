const fs = require('fs/promises')
const path = require('path')
const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')
const gravatar = require('gravatar')
const { Conflict } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../utils')
const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already exists')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const defaultAvatar = gravatar.url(email, { protocol: 'https', s: '100' })
  const verifyToken = v4()

  const emailData = {
    to: email,
    subject: 'Email verification',
    html: `<strong><a href="http://localhost:4000/api/v1/users/verify/${verifyToken}">Confirm your email address</a></strong>`,
  }
  await sendMail(emailData)

  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl: defaultAvatar,
    verificationToken: verifyToken,
  })

  const id = result._id.toString()
  const dirPath = path.join(avatarsDir, id)
  await fs.mkdir(dirPath)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
  })
}

module.exports = signup
