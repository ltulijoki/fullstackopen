import { useApolloClient, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const byGenre = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })
  const client = useApolloClient()

  if (!props.show) {
    return null
  }

  if (result.loading || byGenre.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const booksByGenre = byGenre.data.allBooks

  const genres = books.reduce((pr, cu) => [...pr, ...cu.genres], [])

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <>in genre <strong>{selectedGenre}</strong></>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {selectedGenre ?
            booksByGenre.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          :
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {genres.filter((b, i) => genres.indexOf(b) === i).map(g =>
        <button key={g} onClick={() => { setSelectedGenre(g); client.resetStore() }}>{g}</button>
      )}
      <button onClick={() => { setSelectedGenre(null); client.resetStore() }}>all genres</button>
    </div>
  )
}

export default Books
