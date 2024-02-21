const { throwError } = require('../../utils/helper')
const {
  findRoles,
  findRoleById,
  insertRole,
  findRoleByName,
  editRole,
  deleteRole
} = require('./role.repository')

const getRoles = async () => {
  const roles = await findRoles()
  return roles
}

const getRoleById = async (id) => {
  const role = await findRoleById(id)
  if (!role) {
    throwError('Role not found', 404)
  }
  return role
}

const createRole = async (data) => {
  if (!data.name || data.name === '') {
    throwError('Name is required', 400)
  }
  const checkName = await findRoleByName(data.name)
  if (checkName) {
    throwError('Role already exists', 400)
  }
  const role = await insertRole(data)
  return role
}

const updateRole = async (id, data) => {
  // cek apakah data.name kosong atau tidak
  console.log(data)
  if (!data.name || data.name === '') {
    throwError('Name is required', 400)
  }
  const role = await findRoleById(id)
  console.log(role)
  if (!role) {
    throwError('Role not found', 404)
  }
  const checkName = await findRoleByName(data.name)
  if (checkName) {
    throwError('Role already exists', 400)
  }
  const updatedRole = await editRole(id, data)
  return updatedRole
}

const destroyRole = async (id) => {
  const role = await findRoleById(id)
  if (!role) {
    throwError('Role not found', 404)
  }
  const deletedRole = await deleteRole(id)
  return deletedRole
}

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  destroyRole
}
