const express = require('express')

const { joiSchema } = require('../../models/user')
const {
  validation,
  controllerWrapper,
  authenticate,
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiSchema)

router.post(
  '/signup',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
)

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))

router.get(
  '/logout',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout),
)

router.get(
  '/current',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getCurrent),
)

module.exports = router
