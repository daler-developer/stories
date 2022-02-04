const User = require('../../models/user')

const changeAvatar = async (req, res) => {
  try {
    const file = req.file
    const currentUser = req.user
    const { _id } = req.params

    if (!file) {
      return res.status(400).json({ message: 'No file' })
    }

    const user = await User.findOneAndUpdate(
      { _id },
      { avatarUrl: `/api/files/avatars/${file.filename}` },
      { new: true }
    )

    return res.status(202).json({ user, message: 'Changed avatar' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = changeAvatar
