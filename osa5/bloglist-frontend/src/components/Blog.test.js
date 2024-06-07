import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 1,
  title: 'an awesome blog',
  author: 'blogger',
  url: 'blogurl',
  likes: 0,
  user: {
    id: 1,
    username: 'blogadder'
  }
}

test('renders title', () => {
  render(<Blog blog={blog} like={() => {}} remove={() => {}} username="blogadder" />)

  const title = screen.getByText(blog.title, { exact: false })
  expect(title).toBeDefined()
})

test('renders url, likes and user when click show button', async () => {
  render(<Blog blog={blog} like={() => {}} remove={() => {}} username="blogadder" />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText(blog.url)
  expect(url).toBeDefined()

  const likes = screen.getByText(blog.likes, { exact: false })
  expect(likes).toBeDefined()

  const blogUser = screen.getByText(blog.user.username)
  expect(blogUser).toBeDefined()
})

test('when click the like button two times, they call the function two times', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} like={mockHandler} remove={() => {}} username="blogadder" />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})