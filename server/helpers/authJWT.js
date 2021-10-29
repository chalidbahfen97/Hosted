const jwt = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }
import models from '../models/indexModels'

passport.use(adminStrategy())
const authenticate = passport.authenticate('local', { session: false })

async function login(req, res, next) {
  const { userId, username, email, roleType } = req.user;
  const token = await sign({ userId: userId, username: req.user.username, roleType: req.user.roleType });
  res.cookie('jwt', token, { httpOnly: true })

  res.json({ profile: { userId, username, email, roleType }, success: true, token: token })
}


async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts)
  return token
}

async function ensureHosted(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.username) {
    req.user = payload;
    if (req.user.roleType === 'Hosted') req.isHosted = true;
    return next();
  }

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  next(err);
}

async function ensureUser(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.username) {
    req.user = payload;
    if (req.user.roleType === 'User') req.isUser = true;
    return next();
  }

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  next(err);
}

async function ensureAdmin(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.username === 'admin') return next()
  const err = new Error('Unauthorized')
  err.statusCode = 401
  next(err)
}

async function verify(jwtString = '') {
  jwtString = jwtString.replace(/^Bearer /i, '')
  try {
    const payload = await jwt.verify(jwtString, jwtSecret)
    return payload
  } catch (err) {
    err.statusCode = 401
    throw err
  }
}

function adminStrategy() {

  return new Strategy(async function (username, password, cb) {
    try {
      const result = await models.users.findOne({
        where: { user_name: username }
      });

      const { user_name, user_id, user_password, user_email, user_role_type } = result.dataValues;
      const compare = await bcrypt.compare(password, user_password);

      if (compare) return cb(null, { username: user_name, userId: user_id, email: user_email, roleType: user_role_type })
    } catch (error) {
      console.log(error);
    }

    cb(null, false)
  })
}

export default {
  authenticate,
  login: login,
  ensureAdmin: ensureAdmin,
  ensureHosted: ensureHosted,
  ensureUser: ensureUser
}