const express = require('express')
const router = express.Router()
const { getAll, store, update, destroy, getById } = require('./user.controller')

router.get('/users', getAll)
router.get('/users/:id', getById)
router.post('/users', store)
router.put('/users/:id', update)
router.delete('/users/:id', destroy)

module.exports = router
