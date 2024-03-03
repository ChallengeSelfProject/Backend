const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser
} = require('./user.service')

const getAll = async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUserById(id)
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user
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
    const data = req.body
    const user = await createUser(data)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user
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
    const { id } = req.params
    const data = req.body
    const user = await updateUser(data, id)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params
    const user = await destroyUser(id)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
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
  getById,
  store,
  update,
  destroy
}
