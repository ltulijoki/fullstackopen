import axios from 'axios'

const root = 'http://localhost:3001/persons'

const get = () => {
  return axios.get(root)
}

const add = obj => {
  return axios.post(root, obj)
}

const remove = id => {
  axios.delete(`${root}/${id}`)
}

const update = (id, obj) => {
  return axios.put(`${root}/${id}`, obj)
}

export default { get, add, remove, update }