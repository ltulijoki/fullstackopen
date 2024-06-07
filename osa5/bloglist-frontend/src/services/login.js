import axios from 'axios'

const login = async data => {
  const res = await axios.post('/api/login', data)
  return res.data
}

export default { login }