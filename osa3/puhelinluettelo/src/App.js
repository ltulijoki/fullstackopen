import React, { useEffect, useState } from 'react'
import PersonService from './services/persons.js'

const Message = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const remove = (persons, setPersons, id, name, setMessage, setType) => {
  if (window.confirm(`Delete ${name} ?`)) {
    setPersons(persons.filter(person => person._id !== id))
    PersonService.remove(id)
    setMessage(`Deleted ${name}`)
    setType('added')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
}

const ShowNumber = ({ person, persons, setPersons, id, setMessage, setType }) => {
  return (
    <div>        
      {person.name} {person.number}
      <button onClick={() => {remove(persons, setPersons, id, person.name, setMessage, setType)}}>delete</button>
    </div>
  )
}

const Filter = ({ haku, setSearch }) => {
  return (
    <div>
      <div>filter shown with <input value={haku} onChange={(event) => {setSearch(event.target.value)}} /></div>
    </div>
  )
}

const Persons = ({ persons, search, setPersons, setMessage, setType }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      {filtered.map(person =>
        <ShowNumber person={person} persons={persons} setPersons={setPersons} id={person._id} key={person._id} setMessage={setMessage} setType={setType} />
      )}
    </div>
  )
}

const add = (event, persons, newName, newNumber, setPersons, setNewName, setNewNumber, setMessage, setType) => {
  event.preventDefault()
  var end = false
  persons.forEach(value => {
    if (newName === value.name) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        end = true
        setNewName('')
        setNewNumber('')
        return
      }
      const obj = {
        name : newName,
        number : newNumber
      }
      let id = 0
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === newName) {
          id = persons[i]._id
        }
      }
      PersonService.update(id, obj)
        .then(res => {
          setPersons(persons.map(p => p._id !== id ? p : res.data))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${newName}`)
          setType("added")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(e => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setType('error')
          setPersons(persons.filter(p => p._id !== id))
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
      end = true
    }
  })
  if (!end) {
    const obj = {
      name : newName,
      number : newNumber
    }
    PersonService.add(obj)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setType("added")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data.split('<pre>')[1].split('<br>')[0])
        setType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }
}

const PersonForm = ({ persons, setPersons, setMessage, setType }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  return (
    <div>
      <form onSubmit={(event) => {add(event, persons, newName, newNumber, setPersons, setNewName, setNewNumber, setMessage, setType)}}>
        <div>name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}} /></div>
        <div>number: <input value={newNumber} onChange={(event) => {setNewNumber(event.target.value)}} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    PersonService
      .get()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={type} />
      <Filter persons={persons} search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setType={setType} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} setPersons={setPersons} setMessage={setMessage} setType={setType} />
    </div>
  )
}

export default App