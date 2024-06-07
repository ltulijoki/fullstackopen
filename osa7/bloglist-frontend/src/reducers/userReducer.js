import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: { userData: null, users: [] },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload
    },
    setUsers(state, action) {
      state.users = action.payload
    },
  },
})

export const { setUserData, setUsers } = userSlice.actions

export const getUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch(setUsers(users))
}

export const login = data => async dispatch => {
  const user = await loginService.login(data)
  dispatch(setUserData(user))
  window.localStorage.setItem('bloglistUser', JSON.stringify(user))
  blogService.setToken(user.token)
}

export const logout = () => async dispatch => {
  dispatch(setUserData(null))
  window.localStorage.removeItem('bloglistUser')
}

export default userSlice.reducer
