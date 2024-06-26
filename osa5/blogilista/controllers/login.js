const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user.js')
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(request.body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter