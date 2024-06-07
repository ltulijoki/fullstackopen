import React, { useState } from 'react'

const random = (max) =>  Math.floor(Math.random() * max)

const vote = (selected, oldVotes) => {
  const votes = [...oldVotes]
  votes[selected] += 1

  return votes
}

const getMostPopular = (votes) => {
  return votes.indexOf(Math.max.apply(null, votes.map(v => v)))
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostPopular, setMostPopular] = useState(0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={() => {setVotes(vote(selected, votes)); setMostPopular(getMostPopular(votes))}}>
        vote
      </button>
      <button onClick={() => {setSelected(random(anecdotes.length))}}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostPopular]}
      <br />
      has {votes[mostPopular]} votes
    </div>
  )
}

export default App