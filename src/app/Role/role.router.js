const express = require('express')
const router = express.Router()
const { store, getAll, getById, update, destroy } = require('./role.controller')

router.get('/roles', getAll)
router.get('/roles/:id', getById)
router.post('/roles', store)
router.put('/roles/:id', update)
router.delete('/roles/:id', destroy)

module.exports = router
