const { createUser } = require('../User/user.service')
const { userLogin, userRegister } = require('./auth.service')

const signIn = async (req, res) => {
  try {
    console.log('login')
    const { email, password } = req.body
    const token = await userLogin(email, password)
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: token
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
}

const signUp = async (req, res) => {
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

module.exports = {
  signIn,
  signUp
}
