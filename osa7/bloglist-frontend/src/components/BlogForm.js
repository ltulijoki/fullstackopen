import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

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
    <Form onSubmit={onSubmit} className="short">
      <FloatingLabel label="title">
        <Form.Control
          type="text"
          required
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="title"
          id="title"
        />
      </FloatingLabel>
      <FloatingLabel label="author">
        <Form.Control
          type="text"
          required
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder="author"
          id="url"
        />
      </FloatingLabel>
      <FloatingLabel label="url">
        <Form.Control
          type="url"
          required
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder="url"
          id="url"
        />
      </FloatingLabel>
      <Button type="submit" id="create-blog-button" variant="outline-success">
        create
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
