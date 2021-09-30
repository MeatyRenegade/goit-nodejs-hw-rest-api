const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateAvatar = require('./updateAvatar')
const verifyMail = require('./verifyMail')
const resendMail = require('./resendMail')

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyMail,
  resendMail,
}
