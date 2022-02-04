const User = require('../../models/user')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const candidate = await User.findOne({ username })

    if (candidate) {
      return res.status(500).json({ message: 'User already exists' })
    }

    const user = new User({ username, password })

    try {
      user.validateSync()
    } catch (e) {
      return res.status(400).json({ message: 'Validation error' })
    }

    await user.save()

    const token = jwt.sign({ username: user.username }, 'jwt_secret', {
      expiresIn: '2 days',
    })

    return res.status(202).json({ user, token, message: 'Registered' })
  } catch (e) {
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = register
