const jwt = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy;
import models from "../models/indexModels"

import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }

passport.use(adminStrategy())
const authenticate = passport.authenticate('local', { session: false })

async function login(req, res, next) {
  const { userId, username, email, roleType } = req.user;
  const token = await sign({ userId: userId, username: username, roleType: roleType });
  res.cookie('jwt', token, { httpOnly: true })

  res.json({ profile: { userId, username, email, roleType }, success: true, token: token })
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts)
  return token
}

async function ensureUser(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.roleType) {
    req.user = payload;
    if (req.user.roleType === 'User') return next();
  }

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  next(err);
}

async function ensureHosted(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.roleType) {
    req.user = payload;
    if (req.user.roleType === 'Hosted') return next();
  }

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  next(err);
}

async function ensureAdmin(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
  if (payload.roleType === 'Admin') return next();

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

      const { user_id, user_name, user_email, user_password, user_handphone, user_role } = result.dataValues;
      const compare = await bcrypt.compare(password, user_password);

      if (compare) return cb(
        null, {
        username: user_name,
        userId: user_id, email:
          user_email, handphone:
          user_handphone,
        roleType: user_role
      })
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
  ensureUser: ensureUser,
  ensureHosted: ensureHosted
}