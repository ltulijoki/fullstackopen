const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : undefined
].join(' ')))
app.use(express.static('build'))
require('dotenv').config()
const Numero = require('./models/person.js')

app.get('/api/persons', (req, res) => {
  Numero.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  Numero.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people<br>${new Date().toString()}`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Numero.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  Numero.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Numero({
    name: body.name,
    number: body.number,
  })

  person.
    save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Numero.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const error = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(error)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})