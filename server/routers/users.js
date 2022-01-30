const { Router } = require("express");
const getUsers = require("../controllers/users/getUsers");
const validator = require('express-validator')
const validationMiddleware = require('../middleware/validation')
const authMiddleware = require('../middleware/auth')

const usersRouter = new Router()

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

module.exports = usersRouter
