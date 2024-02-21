const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  destroyRole
} = require('./role.service')

const getAll = async (req, res) => {
  try {
    const roles = await getRoles()
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      data: roles
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
    const role = await getRoleById(id)
    res.status(200).json({
      success: true,
      message: 'Role retrieved successfully',
      data: role
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
    const role = await createRole(data)
    res.status(200).json({
      success: true,
      message: 'Role created successfully',
      data: role
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
    const data = req.body
    const { id } = req.params
    const role = await updateRole(id, data)
    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: role
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
    const { id } = req.params
    const role = await destroyRole(id)
    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
      data: role
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
