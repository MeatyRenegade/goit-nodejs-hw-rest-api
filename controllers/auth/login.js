const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email',
      })
    }
    const hashPassword = user.password
    const compareResult = bcrypt.compareSync(password, hashPassword)
    if (!compareResult) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong password',
      })
    }
    const token = 'ij345lkjkl5.lk5kmnlk44.lkm4lk5lk'
    res.json({
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
