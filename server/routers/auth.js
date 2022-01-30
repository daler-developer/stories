const { Router } = require("express");
const register = require("../controllers/auth/register");
const validator = require('express-validator')
const validation = require('../middleware/validation');
const login = require("../controllers/auth/login");
const loginWithToken = require("../controllers/auth/loginWithToken");


const authRouter = new Router()

authRouter.post(
  '/register',
  [
    validator.body('username')
      .exists().withMessage('no username provided').bail()
      .isString().withMessage('username must be string').trim().bail()
      .notEmpty().withMessage('empty username').bail()
      .isLength({ min: 3 }).withMessage('too short').bail()
      .isLength({ max: 15 }).withMessage('too long').bail()
    ,
    validator.body('password')
      .exists().withMessage('no password provided').bail()
      .isString().withMessage('password must be string').trim().bail()
      .notEmpty().withMessage('empty password').bail()
      .isLength({ min: 3 }).withMessage('too short').bail()
      .isLength({ max: 15 }).withMessage('too long').bail()
    ,
  ], 
  validation,
  register
)
  
authRouter.post(
  '/login',
  [
    validator.body('username')
      .exists().withMessage('no username provided').bail()
      .isString().withMessage('username must be string').trim().bail()
      .notEmpty().withMessage('empty username').bail()
      .isLength({ min: 3 }).withMessage('too short').bail()
      .isLength({ max: 15 }).withMessage('too long').bail()
    ,
    validator.body('password')
      .exists().withMessage('no password provided').bail()
      .isString().withMessage('password must be string').trim().bail()
      .notEmpty().withMessage('empty password').bail()
      .isLength({ min: 3 }).withMessage('too short').bail()
      .isLength({ max: 15 }).withMessage('too long').bail()
    ,
  ],
  validation,
  login
)

authRouter.post(
  '/login-with-token',
  validator.body('token')
    .exists().withMessage('no token provided').bail()
    .isString().withMessage('token must be string').trim().bail()
    .notEmpty().withMessage('empty token').bail()
  ,
  validation,
  loginWithToken
)

module.exports = authRouter
