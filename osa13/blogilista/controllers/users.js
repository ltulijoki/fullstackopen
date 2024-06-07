const bcrypt = require('bcryptjs')
const { User, Blog } = require('../models')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: {
        attributes: ['id', 'read'],
      where: req.query.read ? { read: req.query.read === 'true' } : null
      }
    },
    attributes: ['name', 'username']
  })
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', async (req, res) => {
  const user = await User.create({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10)
  })
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router