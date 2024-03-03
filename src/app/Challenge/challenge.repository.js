const prisma = require('../../config/db')

const findChallenges = async () => {
  const challanges = await prisma.challenge.findMany()
  return challanges
}

const findChallengeBySlug = async (slug) => {
  const challenge = await prisma.challenge.findUnique({
    where: {
      slug
    }
  })
  return challenge
}

const insertChallenge = async (data) => {
  try {
    console.log(data, '<< ini file dari repo')
    const challenge = await prisma.challenge.create({ data })
    return challenge
  } catch (error) {
    console.log(error)
  }
}

const findChallangeByName = async (title) => {
  const challenge = await prisma.challenge.findFirst({
    where: {
      title
    }
  })
  return challenge
}

const editChallenge = async (data, slug, resultPoster) => {
  const challlenge = await prisma.challenge.update({
    where: {
      slug
    },
    data
  })
  return challlenge
}

const deleteChallenge = async (slug) => {
  const challenge = await prisma.challenge.delete({
    where: {
      slug
    }
  })
  return challenge
}

module.exports = {
  findChallenges,
  findChallengeBySlug,
  insertChallenge,
  findChallangeByName,
  editChallenge,
  deleteChallenge
}
