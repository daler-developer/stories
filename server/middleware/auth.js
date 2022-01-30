const User = require("../models/user")
const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next) => {
  const token = req.get('auth-token')

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const decoded = jwt.verify(token, 'jwt_secret') 

    let user

    try {
      user = await User.findOne({ username: decoded.username })  
    } catch (e) {
      return res.status(500).json({ message: 'Server error' })
    }

    if (user) {
      req.user = user

      return next()
    } else {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    

  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: 'Not authenticated' })
  }
}

module.exports = authMiddleware
