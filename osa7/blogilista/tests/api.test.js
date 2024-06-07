const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./helper.js')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

var token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await User.deleteMany({})
  await User.insertMany([
    {
      _id: '634e4573b64b32187cd2ef79',
      username: 'testuser',
      passwordHash: await bcrypt.hash('password', 10),
      __v: 0,
    },
  ])
  var tulos = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'password' })
  token = 'bearer ' + tulos.body.token
})

test('add user', async () => {
  const user = {
    username: 'testing',
    password: 'testpassword',
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const users = await helper.usersInDb()
  expect(users).toHaveLength(2)
})

test('login', async () => {
  const user = {
    username: 'testuser',
    password: 'password',
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.token).toBeDefined()
})

describe('get blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test("id isn't undefined", async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('add blogs', () => {
  test('can add blog', async () => {
    const blog = {
      title: 'Visual Studio Code is cood editor',
      author: 'coder',
      url: 'https://code.visualstudio.com',
      likes: 500,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.blogs.length + 1)
  })

  test('can add blog without likes', async () => {
    const blog = {
      title: 'Fullstack open is good course',
      author: 'fullstacker',
      url: 'https://fullstackopen.com',
    }

    const newBlog = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newBlog.body.likes).toBe(0)
  })

  test("can't add blog without title", async () => {
    const blogs = await helper.blogsInDb()

    const blog = {
      author: 'fullstacker',
      url: 'https://fullstackopen.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogs.length)
  })

  test("can't add blog without url", async () => {
    const blogs = await helper.blogsInDb()

    const blog = {
      title: 'a blog without url',
      author: 'fullstacker',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogs.length)
  })

  test("can't add blog without token", async () => {
    const blogs = await helper.blogsInDb()

    const blog = {
      title: 'testblog',
      author: 'fullstacker',
      likes: 0,
      url: 'https://fullstackopen.com',
    }

    await api.post('/api/blogs').send(blog).expect(401)

    expect(await helper.blogsInDb()).toHaveLength(blogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
