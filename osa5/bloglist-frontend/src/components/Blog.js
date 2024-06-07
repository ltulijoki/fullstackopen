import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, username }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>
          {view ? 'hide' : 'view'}
        </button>
      </div>
      {view &&
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button onClick={like}>like</button>
          </div>
          <div>
            {blog.user.username}
          </div>
          {blog.user.username === username &&
            <div>
              <button onClick={remove}>remove</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog