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

  const defaultAvatar = gravatar.url(email, { protocol: 'https', s: '100' })
  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl: defaultAvatar,
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
