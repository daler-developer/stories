const User = require("../../models/user")
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user) {
      
      if (user.password !== password) {
        return res.status(400).json({ message: 'Wrong password' })
      }

      const token = jwt.sign({ username: user.username }, 'jwt_secret', { expiresIn: '2 days' })

      return res.status(200).json({ user, token, message: 'Logged in' })
    }

    return res.status(404).json({ message: 'User does not exist' })
    
  } catch (e) {
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = login
