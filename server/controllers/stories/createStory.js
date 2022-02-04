const Story = require('../../models/story')

const createStory = async (req, res) => {
  try {
    const file = req.file
    const currentUser = req.user

    if (!file) {
      return res.status(400).json({ message: 'File is not given' })
    }

    const story = new Story({
      creatorId: currentUser._id,
      fileUrl: `/api/files/stories/${file.filename}`,
    })

    await story.save()

    return res.status(202).json({ message: 'Story created', story })
  } catch (e) {
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = createStory
