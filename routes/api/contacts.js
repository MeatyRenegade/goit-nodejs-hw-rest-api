const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const contactValidation = validation(joiSchema)

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', contactValidation, ctrl.add)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', contactValidation, ctrl.updateById)

router.patch('/:contactId/favorite', ctrl.updateFav)

module.exports = router
