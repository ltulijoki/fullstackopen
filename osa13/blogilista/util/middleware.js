const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'TypeError') {
    return res.status(404).send({ error: 'not found' })
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const key = jwt.decode(authorization.substring(7), SECRET)
      const session = await Session.findOne({
        where: {
          key
        }
      })
      const user = await User.findByPk(session.userId)
      if (user.disabled) {
        return res.status(401).json({ error: 'user is disabled' })
      }
      req.user = user
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}