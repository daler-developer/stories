const User = require("../../models/user")
const jwt = require('jsonwebtoken')


const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body

    let decoded
    let candidate

    try {
      decoded = jwt.verify(token, 'jwt_secret')
    } catch (e) {
      return res.status(500).json({ message: 'Invalid token' })
    }

    try {
      candidate = await User.findOne({ username: decoded.username })
    } catch (e) {
      return res.status(500).json({ message: 'Server error' })
    }

    if (candidate) {
      return res.status(200).json({ user: candidate, message: 'Logged in' })
    } 

    return res.status(404).json({ message: 'User not found' })

  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Unknown error' })

  }
}

module.exports = loginWithToken
