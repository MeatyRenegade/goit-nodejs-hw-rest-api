const fs = require('fs/promises')
const path = require('path')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { Conflict } = require('http-errors')

const { User } = require('../../models')
const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already exists')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const avatar = gravatar.url(email, { protocol: 'http', s: '250' })
  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl: avatar,
  })
  const dirPath = path.join(avatarsDir, result._id.toString())
  await fs.mkdir(dirPath)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
  })
}

module.exports = signup
