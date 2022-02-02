const { Router } = require("express");
const getUsers = require("../controllers/users/getUsers");
const validator = require('express-validator')
const validationMiddleware = require('../middleware/validation')
const authMiddleware = require('../middleware/auth');
const changeAvatar = require("../controllers/users/changeAvatar");
const multer  = require('multer');
const { avatarsStorage } = require("../utils/storages");

const usersRouter = new Router()

const upload = multer({ storage: avatarsStorage })

usersRouter.get(
  '/',
  authMiddleware,
  validator.query('excludeCurrent')
    .if(validator.query('excludeCurrent').exists())
    .customSanitizer((v) => v === 'yes' ? true : false)
  ,
  validationMiddleware,
  getUsers
)

usersRouter.post(
  '/:_id/change-avatar',
  authMiddleware,
  upload.single('image'),
  changeAvatar
)

module.exports = usersRouter
