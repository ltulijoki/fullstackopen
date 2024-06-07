const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const search = req.query.search
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where: search
      ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { author: { [Op.iLike]: `%${search}%` } }
        ]
      }
      : undefined,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  res.json(blog)
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog.userId !== req.user.id) {
    return res.status(403).end()
  }
  await blog.destroy()
  res.status(204).end()
})

module.exports = router