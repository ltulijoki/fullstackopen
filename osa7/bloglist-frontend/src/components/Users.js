import React from 'react'
import { Badge, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.user.users)
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Users</h2>
      <ListGroup className="short" variant="flush">
        <ListGroup.Item />
        <ListGroup.Item>
          <strong className="oik">blogs created</strong>
        </ListGroup.Item>
        {users.map(user => (
          <ListGroup.Item key={user.username}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            <Badge bg="primary" pill className="right">
              {blogs.filter(b => b.user.id === user.id).length}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Users
