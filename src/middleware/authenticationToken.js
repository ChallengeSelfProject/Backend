const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Authentication failed' })

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err)
      return res.status(403).json({ error: 'Token is not valid' })
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken
