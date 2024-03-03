const prisma = require('../../config/db')

const find = async () => {
  const users = await prisma.user.findMany({
    include: {
      Role: true
    }
  })
  return users
}

const findById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      Role: true
    }
  })
  return user
}

const findByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  return user
}

const findByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })
  return user
}

const insert = async (data) => {
  const user = await prisma.user.create({ data })
  return user
}

const update = async (data, id) => {
  const user = await prisma.user.update({
    where: {
      id
    },
    data
  })
  return user
}

const destroy = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id
    }
  })
  return user
}

module.exports = {
  find,
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  destroy
}
