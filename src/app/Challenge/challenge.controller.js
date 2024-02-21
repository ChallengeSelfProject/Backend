const {
  getChallenges,
  getChalllengeBySlug,
  createChallenge,
  updateChallenge,
  destroyChallenge
} = require('./challenge.service')

const getAll = async (req, res) => {
  try {
    const challenges = await getChallenges()
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      data: challenges
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const challenge = await getChalllengeBySlug(slug)
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      data: challenge
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const store = async (req, res) => {
  try {
    const dataCreateChallenge = req.body
    const poster = req.file
    // console.log(poster, '<< ini file dari controller')
    const challenge = await createChallenge(dataCreateChallenge, poster)
    res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      data: challenge
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    console.log(req.file, '<< ini request file controller')
    const dataUpdateChallenge = req.body
    const poster = req.file
    const { slug } = req.params
    const challenge = await updateChallenge(dataUpdateChallenge, poster, slug)
    res.status(201).json({
      success: true,
      message: 'Challenge updated successfully',
      data: challenge
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const destroy = async (req, res) => {
  try {
    const { slug } = req.params
    const challenge = await destroyChallenge(slug)
    res.status(201).json({
      success: true,
      message: 'Challenge deleted successfully',
      data: challenge
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  getBySlug,
  store,
  update,
  destroy
}
