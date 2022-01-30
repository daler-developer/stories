const Story = require("../../models/story")

const createStory = async (req, res) => {
  try {
    const file = req.file
    const currentUser = req.user

    const story = new Story({ creatorId: currentUser._id, filename: file.filename })

    await story.save()

    return res.status(202).json({ message: 'Story created' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = createStory