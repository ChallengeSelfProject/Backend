const express = require('express')
const router = express.Router()

const { signIn, signUp } = require('./auth.controller')
const authenticateToken = require('../../middleware/authenticationToken')

router.post('/login', signIn)
router.post('/register', signUp)

router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected route',
    data: req.user
  })
})

module.exports = router
