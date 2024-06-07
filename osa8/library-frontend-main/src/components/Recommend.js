import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const fav = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  useEffect(() => {
    if (fav.data && fav.data.me) setFavoriteGenre(fav.data.me.favoriteGenre)
  }, [fav.data])

  if (fav.loading || result.loading) return <div>loading...</div>

  if (!show) return

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend