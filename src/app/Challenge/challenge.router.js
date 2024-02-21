const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
  storage
})

const {
  store,
  getAll,
  getBySlug,
  update,
  destroy
} = require('./challenge.controller')

router.get('/challenges', getAll)
router.get('/challenges/:slug', getBySlug)
router.post('/challenges', upload.single('image'), store)
router.put('/challenges/:slug', upload.single('image'), update)
router.delete('/challenges/:slug', destroy)

module.exports = router
