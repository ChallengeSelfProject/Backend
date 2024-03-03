const path = require('path')
const cloudinary = require('cloudinary').v2

const throwError = (message, statusCode) => {
  const error = new Error(message)
  error.statusCode = statusCode
  throw error
}

const generateSlug = (title) => {
  const sanitazeTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, '') // Remove leading and trailing hyphens

  return sanitazeTitle
}

const getPublicIdImageCloudinary = (imageUrl) => {
  const parseUrl = new URL(imageUrl)
  const pathSegments = parseUrl.pathname.split('/')
  const publicIdIndex = pathSegments.indexOf('upload') + 2

  if (publicIdIndex < pathSegments.length) {
    const publicId = pathSegments[publicIdIndex]
    const publicIdWithoutExtension = path.parse(publicId).name
    return publicIdWithoutExtension
  }
}

const uploadImage = async (image) => {
  const b64 = Buffer.from(image.buffer).toString('base64')
  const dataURI = 'data:' + image.mimetype + ';base64,' + b64
  const resultImage = await cloudinary.uploader.upload(dataURI)
  return resultImage
}

const destroyImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId)
}

const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/
  return emailRegex.test(email)
}

module.exports = {
  throwError,
  generateSlug,
  getPublicIdImageCloudinary,
  uploadImage,
  destroyImage,
  isValidEmail
}
