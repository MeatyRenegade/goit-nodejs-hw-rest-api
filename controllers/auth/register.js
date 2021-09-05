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
    const result = await User.create({ email, password })
    res.status(201).json({
      status: 'success',
      code: 201,
      message: "Successfully registered"
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
