const Story = require("../../models/story")

const getStories = async (req, res) => {
  try {
    const stories = await Story.find()

    return res.status(202).json({ stories, message: 'Stories sent' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = getStories