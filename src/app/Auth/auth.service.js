const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { throwError, isValidEmail } = require('../../utils/helper')
const { findByEmail, findByUsername } = require('../User/user.repository')

const userLogin = async (email, password) => {
  const user = await findUserByEmailOrUsername(email)
  if (!user) {
    throwError('User not found', 404)
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throwError('Invalid password', 401)
  }

  const data = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.Role.name
  }
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
  return token
}

const findUserByEmailOrUsername = async (input) => {
  if (isValidEmail(input)) {
    return await findByEmail(input)
  } else {
    return await findByUsername(input)
  }
}

module.exports = {
  userLogin
}
