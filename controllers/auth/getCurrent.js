const getCurrent = async (req, res) => {
  const user = req.user
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  })
}

module.exports = getCurrent
