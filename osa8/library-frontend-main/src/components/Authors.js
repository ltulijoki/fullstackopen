import { useMutation, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [authors, setAuthors] = useState(null)

  useEffect(() => {
    if (!result.loading) setAuthors(result.data.allAuthors)
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (authors && authors.length > 0) {
      setName(authors[0].name)
    }
  }, [authors])

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors && authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
        <>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
        <div>
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map(a =>
                <option key={a.name}>{a.name}</option>
              )}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </>
    }
    </div>
  )
}

export default Authors
