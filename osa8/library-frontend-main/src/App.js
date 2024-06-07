import { useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = b => {
    let seen = new Set()
    return b.filter(iBook => {
      let book = iBook.title
      return seen.has(book) ? false : seen.add(book)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const added = subscriptionData.data.bookAdded
      alert(`A book ${added.title} added!`)
      updateCache(client.cache, { query: ALL_BOOKS }, added)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add' || page === 'recommend') setPage('login')
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App
