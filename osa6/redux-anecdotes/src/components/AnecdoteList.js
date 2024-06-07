import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote as vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteAnecdote = anecdote => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {[...anecdotes]
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList