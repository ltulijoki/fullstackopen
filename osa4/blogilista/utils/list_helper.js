const dummy = () => 1

const totalLikes = blogs =>
  blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs =>
  blogs
    .map(b => { return { title: b.title, author: b.author, likes: b.likes } })
    .reduce((prev, blog) => blog.likes > prev.likes ? blog : prev, { likes: -1 })

const mostBlogs = blogs => {
  const authors = []

  blogs.forEach(b => {
    if (!authors.map(a => a.author).includes(b.author)) {
      authors.push({
        author: b.author,
        blogs: 0
      })
    }
    authors.find(a => a.author === b.author).blogs++
  })

  return authors
    .reduce((prev, author) => author.blogs > prev.blogs ? author : prev,
      { blogs: -1 })
}

const mostLikes = blogs => {
  const authors = []

  blogs.forEach(b => {
    if (!authors.map(a => a.author).includes(b.author)) {
      authors.push({
        author: b.author,
        likes: 0
      })
    }
    authors.find(a => a.author === b.author).likes += b.likes
  })

  return authors
    .reduce((prev, author) => author.likes > prev.likes ? author : prev,
      { likes: -1 })}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}