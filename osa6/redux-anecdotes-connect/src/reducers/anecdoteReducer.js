import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id === id ? votedAnecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const getAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdoteService.create(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdote = anecdote => async dispatch => {
  const voted = await anecdoteService.vote(anecdote)
  dispatch(vote(voted.id))
}

export default anecdoteSlice.reducer