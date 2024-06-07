import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'

import { notification as setNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'
import {
  getUsers,
  login as reducerLogin,
  logout,
  setUserData,
} from './reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Nav,
  Navbar,
} from 'react-bootstrap'

const Message = ({ message, type }) => {
  const dispatch = useDispatch()

  if (message === '') {
    return null
  }

  return (
    <Alert
      variant={type === 'error' ? 'danger' : 'success'}
      dismissible
      onClose={() => dispatch(setNotification('', '', 0))}
    >
      {message}
    </Alert>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user.userData)

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserData(user))
      blogService.setToken(user.token)
    }
  }, [])

  const login = async event => {
    event.preventDefault()
    try {
      await dispatch(reducerLogin({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <Form onSubmit={login} className="short">
          <h2>log in to application</h2>
          <Message {...notification} />
          <FloatingLabel label="username">
            <Form.Control
              type="text"
              required
              value={username}
              name="Username"
              onChange={event => setUsername(event.target.value)}
              id="username"
              placeholder="username"
            />
          </FloatingLabel>
          <FloatingLabel label="password">
            <Form.Control
              type="password"
              required
              value={password}
              name="Password"
              onChange={event => setPassword(event.target.value)}
              id="password"
              placeholder="password"
            />
          </FloatingLabel>
          <Button id="login-button" type="submit" variant="outline-primary">
            login
          </Button>
        </Form>
      </div>
    )
  }

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link as="span" className="nav-text">
              {user.username} logged in
            </Nav.Link>
            <Button onClick={() => dispatch(logout())} variant="outline-danger">
              logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>blog app</h1>
      <Message {...notification} />
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
