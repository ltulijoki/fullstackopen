import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-logged-user', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return

  const os = async event => {
    event.preventDefault()

    login({
      variables: {
        username,
        password
      }
    })
      .then(r => {
        setPage('authors')
        setUsername('')
        setPassword('')
      })
      .catch(e => {
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <form onSubmit={os}>
      <div>
        name
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default Login