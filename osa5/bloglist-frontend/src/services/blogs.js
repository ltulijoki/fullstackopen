import axios from 'axios'
const baseUrl = '/api/blogs'

var token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async data => {
  const res = await axios.post(baseUrl, data, { headers: { Authorization: token } })
  return res.data
}

const update = async (id, data) => {
  const res = await axios.put(`${baseUrl}/${id}`, data, { headers: { Authorization: token } })
  return res.data
}

const remove = async id => {
  const res = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return res.data
}

export default { setToken, getAll, create, update, remove }