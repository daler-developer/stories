const Story = require('../../models/story')

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({
      created: {
        $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    })

    return res.status(202).json({ stories, message: 'Stories sent' })
  } catch (e) {
    return res.status(400).json({ message: 'Unknown error' })
  }
}

module.exports = getStories
