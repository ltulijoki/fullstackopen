import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog form calls the function with right data', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<BlogForm createBlog={mockHandler} />)

  const titleInput = screen.getByPlaceholderText("blog's title")
  await user.type(titleInput, 'an awesome blog')

  const authorInput = screen.getByPlaceholderText("blog's author")
  await user.type(authorInput, 'blogger')

  const urlInput = screen.getByPlaceholderText("blog's url")
  await user.type(urlInput, 'blogurl')

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('an awesome blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('blogger')
  expect(mockHandler.mock.calls[0][0].url).toBe('blogurl')
})
