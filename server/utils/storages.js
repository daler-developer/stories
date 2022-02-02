const multer  = require('multer')
const path = require('path')

const storiesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../media/stories'))
  },
  filename: function (req, file, cb) {
    const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${prefix}_${file.originalname}`)
  }
})

const avatarsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../media/avatars'))
  },
  filename: function (req, file, cb) {
    const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${prefix}_${file.originalname}`)
  }
})

module.exports = { storiesStorage, avatarsStorage }
