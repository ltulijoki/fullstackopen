import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async content => {
  const obj = { content, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const vote = async anecdote => {
  const voted = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, voted)
  return res.data
}

export default { getAll, create, vote }