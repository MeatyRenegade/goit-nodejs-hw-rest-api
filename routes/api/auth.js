const express = require('express')

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiSchema)

router.post(
  '/register',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
)

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))

// router.get('/logout', controllerWrapper(ctrl.logout))

// router.get('/current', controllerWrapper(ctrl.current))

module.exports = router
