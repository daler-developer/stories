const User = require('../../models/user')

const getUsers = async (req, res) => {
  try {
    const { excludeCurrent } = req.query
    const currentUser = req.user

    try {
      const users = User.find()

      if (excludeCurrent) {
        users.where('_id').ne(currentUser._id)
      }

      users.exec((errors, result) => {
        if (errors) {
          return res.status(500).json({ message: 'Cannot get users' })
        }

        return res
          .status(200)
          .json({ users: result, message: 'Cannot get users' })
      })
    } catch (e) {
      return res.status(400).json({ message: 'Cannot access db' })
    }
  } catch (e) {
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = getUsers
