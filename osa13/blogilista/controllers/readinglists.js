const { Readinglist } = require('../models')
const { tokenExtractor } = require('../util/middleware')
const router = require('express').Router()

router.post('/', async (req, res) => {
  const readinglist = await Readinglist.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id
  })
  res.json(readinglist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading = await Readinglist.findByPk(req.params.id)
  if (!reading) {
    return res.status(404).send({ error: 'reading not found' })
  }
  if (reading.userId !== req.user.id) {
    return res.status(400).send({ error: 'this isn\'t your readinglist' })
  }
  reading.read = req.body.read
  await reading.save()
  res.json(reading)
})

module.exports = router