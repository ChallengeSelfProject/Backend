const {
  throwError,
  getPublicIdImageCloudinary,
  generateSlug,
  uploadImage,
  destroyImage
} = require('../../utils/helper')
const cloudinary = require('cloudinary').v2

const {
  findChallenges,
  findChallengeBySlug,
  insertChallenge,
  findChallangeByName,
  editChallenge,
  deleteChallenge
} = require('./challenge.repository')

// const { uploadImage } = require('../Image/image.service')

const getChallenges = async () => {
  const challenges = await findChallenges()
  return challenges
}

const getChalllengeBySlug = async (slug) => {
  const challenge = await findChallengeBySlug(slug)
  if (!challenge) {
    throwError('Challenge not found', 404)
  }
  return challenge
}

const createChallenge = async (dataCreateChallenge, poster) => {
  const resultPoster = await uploadImage(poster)

  const data = {
    slug: generateSlug(dataCreateChallenge.title),
    title: dataCreateChallenge.title,
    description: dataCreateChallenge.description,
    startDate: dataCreateChallenge.startDate,
    endDate: dataCreateChallenge.endDate,
    urlPoster: resultPoster.url
  }

  const challange = await insertChallenge(data)
  return challange
}

const updateChallenge = async (dataUpdateChallenge, poster, slug) => {
  try {
    const findChallenge = await findChallengeBySlug(slug)

    if (!findChallenge) {
      throwError('Challange not found', 404)
    }

    const checkName = await findChallangeByName(dataUpdateChallenge.title)
    if (checkName) {
      throwError('Challenge already exists', 400)
    }

    if (poster) {
      const publicIdPosterImage = getPublicIdImageCloudinary(
        findChallenge.urlPoster
      )
      await destroyImage(publicIdPosterImage)
      const resultPoster = await uploadImage(poster)

      const data = {
        slug: generateSlug(dataUpdateChallenge.title),
        title: dataUpdateChallenge.title,
        description: dataUpdateChallenge.description,
        startDate: dataUpdateChallenge.startDate,
        endDate: dataUpdateChallenge.endDate,
        urlPoster: resultPoster.url
      }

      const challenge = await editChallenge(data, slug)
      return challenge
    } else {
      const data = {
        slug: generateSlug(dataUpdateChallenge.title),
        title: dataUpdateChallenge.title,
        description: dataUpdateChallenge.description,
        startDate: dataUpdateChallenge.startDate,
        endDate: dataUpdateChallenge.endDate
      }

      const challenge = await editChallenge(data, slug)
      return challenge
    }
  } catch (error) {
    throwError(error)
  }
}

const destroyChallenge = async (slug) => {
  const findChallenge = await findChallengeBySlug(slug)
  const publicIdPosterImage = getPublicIdImageCloudinary(
    findChallenge.urlPoster
  )
  await destroyImage(publicIdPosterImage)
  const challenge = await deleteChallenge(slug)
  return challenge
}

module.exports = {
  getChallenges,
  getChalllengeBySlug,
  createChallenge,
  updateChallenge,
  destroyChallenge
}
