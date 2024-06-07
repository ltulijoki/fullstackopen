import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const notification = (message, type, secs) => dispatch => {
  dispatch(setNotification({ message, type }))
  setTimeout(() => {
    dispatch(setNotification({ message: '', type: '' }))
  }, secs * 1000)
}

export default notificationSlice.reducer
