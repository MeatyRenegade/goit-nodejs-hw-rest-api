const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Already exists',
      })
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({ email, password: hashPassword })

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Successfully registered',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
