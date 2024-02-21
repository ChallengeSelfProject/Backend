const prisma = require('../../config/db')

const findRoles = async () => {
  const roles = await prisma.role.findMany()
  return roles
}

const findRoleById = async (id) => {
  const role = await prisma.role.findUnique({
    where: {
      id
    }
  })
  return role
}

const findRoleByName = async (name) => {
  const role = await prisma.role.findFirst({
    where: {
      name
    }
  })
  return role
}

const insertRole = async (data) => {
  const role = await prisma.role.create({
    data: {
      name: data.name
    }
  })
  return role
}

const editRole = async (id, data) => {
  const role = await prisma.role.update({
    where: {
      id
    },
    data: {
      name: data.name,
      updatedAt: new Date()
    }
  })
  return role
}

const deleteRole = async (id) => {
  const role = await prisma.role.delete({
    where: {
      id
    }
  })
  return role
}

module.exports = {
  findRoles,
  findRoleById,
  findRoleByName,
  insertRole,
  editRole,
  deleteRole
}
