import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable.js'
import BlogForm from './components/BlogForm.js'

const Message = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const ref = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((v, w) => v.likes - w.likes).reverse() )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMessage('wrong username or password')
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async object => {
    const returnedBlog = await blogService.create(object)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`a new blog ${object.title} by ${object.author} added`)
    setType('addedBlog')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    ref.current.toggleVisibility()
  }

  const like = blog => async () => {
    const returnedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })

    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
  }

  const remove = blog => async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  if (user === null) {
    return (
      <div>
        <form onSubmit={login}>
          <h2>log in to application</h2>
          <Message message={message} type={type} />
          username
          <input type="text" required value={username} name="Username" onChange={event => setUsername(event.target.value)} id="username" />
          <br />
          password
          <input type="password" required value={password} name="Password" onChange={event => setPassword(event.target.value)} id="password" />
          <br />
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} type={type} />
      <p>{user.username} logged in<button onClick={() => {setUser(null); window.localStorage.removeItem('bloglistUser')}}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like(blog)} remove={remove(blog)} username={user.username} />
      )}
    </div>
  )
}

export default App