const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const middleware = require('../utils/middleware')
require('dotenv').config()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.tokenExractor, middleware.userExractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const user = request.user
  const likes = request.body.likes === undefined ? 0 : request.body.likes
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', middleware.tokenExractor, middleware.userExractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = request.user.id
  const blog = await Blog.findById(request.params.id)
  if (blog === null) {
    return null
  }
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'wrong user' })
  }
})

blogsRouter.put('/:id', middleware.tokenExractor, middleware.userExractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updated.toJSON())
})

module.exports = blogsRouter