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

    candidate = await User.findOne({ username: decoded.username })

    if (candidate) {
      return res.status(200).json({ user: candidate, message: 'Logged in' })
    } 

    return res.status(404).json({ message: 'User not found' })
  } catch (e) {
    return res.status(500).json({ message: 'Unknown error' })

  }
}

module.exports = loginWithToken
