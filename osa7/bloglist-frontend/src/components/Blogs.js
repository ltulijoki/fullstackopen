import React, { useRef } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const dispatch = useDispatch()
  const ref = useRef()
  const blogs = useSelector(state => state.blogs)

  const addBlog = async object => {
    dispatch(createBlog(object))
    dispatch(
      notification(
        `a new blog ${object.title} by ${object.author} added`,
        'addedBlog',
        5
      )
    )
    ref.current.toggleVisibility()
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ListGroup variant="flush" className="short">
        {[...blogs]
          .sort((v, w) => v.likes - w.likes)
          .reverse()
          .map(blog => (
            <ListGroup.Item key={blog.title}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default Blogs
