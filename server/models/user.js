const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarFileName: {
    type: String,
    required: false
  }
})

const User = model('User', UserSchema)

module.exports = User
