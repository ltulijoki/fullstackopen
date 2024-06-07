import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      const likedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map(b => (b.id === id ? likedBlog : b))
    },
    comment(state, action) {
      const { id, comment } = action.payload
      const blogToChange = state.find(b => b.id === id)
      const commented = {
        ...blogToChange,
        comments: [...blogToChange.comments, comment],
      }
      return state.map(b => (b.id === id ? commented : b))
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs, like, remove, comment } = blogSlice.actions

export const getBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = obj => async dispatch => {
  const newBlog = await blogService.create(obj)
  dispatch(appendBlog(newBlog))
}

export const likeBlog = blog => async dispatch => {
  const liked = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
  })
  dispatch(like(liked.id))
}

export const removeBlog = id => async dispatch => {
  await blogService.remove(id)
  dispatch(remove(id))
}

export const commentBlog = (id, commentMessage) => async dispatch => {
  await blogService.comment(id, commentMessage)
  dispatch(comment({ id, comment: commentMessage }))
}

export default blogSlice.reducer
