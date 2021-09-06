const express = require('express')

const { joiSchema } = require('../../models/contact')
const {
  validation,
  controllerWrapper,
  authenticate,
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

const contactValidationMiddleware = validation(joiSchema)

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))

router.get(
  '/:contactId',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getById),
)

router.post(
  '/',
  controllerWrapper(authenticate),
  contactValidationMiddleware,
  controllerWrapper(ctrl.add),
)

router.delete(
  '/:contactId',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.deleteById),
)

router.put(
  '/:contactId',
  controllerWrapper(authenticate),
  contactValidationMiddleware,
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.updateFav),
)

module.exports = router
