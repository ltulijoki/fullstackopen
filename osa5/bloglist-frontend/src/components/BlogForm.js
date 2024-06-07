import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input type="text" required value={title} onChange={event => setTitle(event.target.value)} placeholder="blog's title" id="title" />
      </div>
      <div>
        author:
        <input type="text" required value={author} onChange={event => setAuthor(event.target.value)} placeholder="blog's author" id="author" />
      </div>
      <div>
        url:
        <input type="url" required value={url} onChange={event => setUrl(event.target.value)} placeholder="blog's url" id="url" />
      </div>
      <button type="submit" id="create-blog-button">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm