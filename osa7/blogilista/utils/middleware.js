const logger = require('./logger.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const error = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  logger.error(error.message)

  next(error)
}

const tokenExractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExractor = async (request, response, next) => {
  if (request.token) {
    const decoded = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decoded.id)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  error,
  tokenExractor,
  userExractor,
}
