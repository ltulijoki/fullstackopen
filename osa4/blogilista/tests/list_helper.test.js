const listHelper = require('../utils/list_helper')
const helper = require('./helper.js')

const blogs = helper.blogs

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('one blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('six blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('one author', () => {
    const result = listHelper.mostBlogs([blogs[1], blogs[2]])
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })

  test('three authors', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('one author', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('three authors', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})