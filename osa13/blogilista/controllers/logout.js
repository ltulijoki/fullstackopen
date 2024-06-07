const { Session } = require('../models')
const router = require('express').Router()

router.delete('/', async (req, res) => {
  await Session.destroy({
    where: {}
  })
  res.sendStatus(204)
})

module.exports = router