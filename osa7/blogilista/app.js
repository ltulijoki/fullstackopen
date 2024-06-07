const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
try {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
} catch {
  logger.info('Failed')
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/testing', testRouter)
}

module.exports = app
