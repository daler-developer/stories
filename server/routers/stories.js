const { Router } = require("express");
const createStory = require("../controllers/stories/createStory");
const getStories = require("../controllers/stories/getStories");
const validationMiddleware = require('../middleware/validation')
const validator = require('express-validator')
const authMiddleware = require('../middleware/auth')
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../media/stories'))
  },
  filename: function (req, file, cb) {
    const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${prefix}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const storiesRouter = new Router()


storiesRouter.post(
  '/',
  authMiddleware,
  [],
  validationMiddleware,
  upload.single('image'),
  createStory
)

storiesRouter.get(
  '/',
  authMiddleware,
  [],
  validationMiddleware,
  getStories
)

module.exports = storiesRouter
