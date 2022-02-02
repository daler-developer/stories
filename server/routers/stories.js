const { Router } = require("express");
const createStory = require("../controllers/stories/createStory");
const getStories = require("../controllers/stories/getStories");
const validationMiddleware = require('../middleware/validation')
const validator = require('express-validator')
const authMiddleware = require('../middleware/auth')
const multer  = require('multer')
const path = require('path');
const { storiesStorage } = require("../utils/storages");


const storiesRouter = new Router()

const upload = multer({ storage: storiesStorage })

storiesRouter.post(
  '/',
  authMiddleware,
  validationMiddleware,
  upload.single('image'),
  createStory
)

storiesRouter.get(
  '/',
  authMiddleware,
  validationMiddleware,
  getStories
)

module.exports = storiesRouter
