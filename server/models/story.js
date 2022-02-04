const { Schema, model } = require('mongoose')

const StorySchema = new Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Schema.Types.Date,
    required: true,
    default() {
      return new Date()
    },
  },
})

const Story = model('Story', StorySchema)

module.exports = Story
