const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user.js')

usersRouter.post('/', async (request, response) => {
  const cond =
    request.body.username &&
    !request.body.username.length < 3 &&
    request.body.password &&
    !request.body.password.length < 3
  if (!cond) {
    return response.status(400).json({ error: 'error in username or password' })
  }
  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: await bcrypt.hash(request.body.password, 10),
  })

  response.status(201).json(await user.save())
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
