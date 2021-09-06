const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already exists')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword })

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Successfully registered',
  })
}

module.exports = signup
