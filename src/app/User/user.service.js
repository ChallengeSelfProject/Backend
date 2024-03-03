const { throwError } = require('../../utils/helper')
const {
  find,
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  destroy
} = require('./user.repository')
const { findRoleById } = require('../Role/role.repository')
const bcrypt = require('bcrypt')
const { sanitizeUser } = require('./data-sanitizer')

const getUsers = async () => {
  const users = await find()
  console.log(users)
  const data = users.map(function (user) {
    return sanitizeUser(user)
  })

  return data
}

const getUserById = async (id) => {
  const user = await findById(id)
  if (!user) {
    throwError('User not found', 404)
  }
  return sanitizeUser(user)
}

const createUser = async (data) => {
  const checkEmail = await findByEmail(data.email)
  console.log(checkEmail, data)
  if (checkEmail) {
    throwError('Email already exists', 400)
  }

  const checkUsername = await findByUsername(data.username)
  if (checkUsername) {
    throwError('Username already exists', 400)
  }

  // cek role dari repository role
  const role = await findRoleById(data.role_id)
  if (!role) {
    throwError('Role not found', 404)
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.password, salt)
  data.password = hashedPassword

  const user = await insert(data)
  return sanitizeUser(user)
}

const updateUser = async (data, id) => {
  // cek user ada atau tidak
  const findUser = await findById(id)
  if (!findUser) {
    throwError('User not found', 404)
  }

  // cek email
  const checkEmail = await findByEmail(data.email)
  if (checkEmail && checkEmail.id !== id) {
    throwError('Email already exists', 400)
  }

  // cek username
  const checkUsername = await findByUsername(data.username)
  if (checkUsername && checkUsername.id !== id) {
    throwError('Username already exists', 400)
  }

  // cek role dari repository role
  const role = await findRoleById(data.role_id)
  if (!role) {
    throwError('Role not found', 404)
  }

  // hash password
  if (data.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    data.password = hashedPassword
  }

  const user = await update(data, id)
  return sanitizeUser(user)
}

const destroyUser = async (id) => {
  // cek user ada atau tidak
  const findUser = await findById(id)
  if (!findUser) {
    throwError('User not found', 404)
  }

  const user = await destroy(id)
  return sanitizeUser(user)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser
}
