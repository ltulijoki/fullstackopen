import React from 'react'

const Header = (props) => <h2>{props.course}</h2>

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part =>
      <Part part={part.name} exercises={part.exercises} key={part.name} />
    )}
  </div>
)

const Total = (props) => (
  <div>
    <b>total of exercises {props.parts.reduce((prev, curr) => prev + curr.exercises, 0)}</b>
  </div>
)

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)

export default Course