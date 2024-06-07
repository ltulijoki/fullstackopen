import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { commentBlog as reducerComment } from '../reducers/blogReducer'
import {
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(b => b.id === id)
  const username = useSelector(state => state.user.userData.username)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const like = async () => {
    dispatch(likeBlog(blog))
  }

  const remove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(removeBlog(blog.id))
    navigate('/')
  }

  const commentBlog = event => {
    event.preventDefault()
    dispatch(reducerComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button onClick={like} variant="outline-success">
          like
        </Button>
      </div>
      <div>added by {blog.user.username}</div>
      {blog.user.username === username && (
        <div>
          <Button onClick={remove} variant="outline-danger">
            remove
          </Button>
        </div>
      )}
      <h3>comments</h3>
      <Form onSubmit={commentBlog}>
        <InputGroup>
          <FloatingLabel label="your comment here">
            <Form.Control
              type="text"
              value={comment}
              onChange={event => setComment(event.target.value)}
              required
              placeholder="your comment here"
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-success">
            add comment
          </Button>
        </InputGroup>
      </Form>
      <ListGroup variant="flush" className="short">
        {blog.comments.map(comment => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
