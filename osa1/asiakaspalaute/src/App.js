import React, { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, sum }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='avegrade' value={sum / all} />
        <StatisticLine text='positive' value={(good / all * 100) + ' %'} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  if (all === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={goodClick} text='good' />
        <Button handleClick={neutralClick}text='neutral' />
        <Button handleClick={badClick}text='bad' />
        <h2>statistics</h2>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick}text='neutral' />
      <Button handleClick={badClick}text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} sum={sum} />
    </div>
  )
}

export default App;
