const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v1: uuid } = require('uuid')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')
const router = require('express').Router()

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(400).json({ error: 'invalid username or password' })
  }

  const key = uuid()
  await Session.create({ key, userId: user.id })

  const token = jwt.sign(key, SECRET)
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router