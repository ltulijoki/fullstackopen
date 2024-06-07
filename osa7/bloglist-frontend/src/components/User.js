import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.user.users).find(u => u.id === id)
  const blogs = useSelector(state => state.blogs).filter(b => b.user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ListGroup variant="flush">
        {blogs.map(blog => (
          <ListGroup.Item key={blog.title}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
