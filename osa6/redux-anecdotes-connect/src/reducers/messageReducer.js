import { createSlice } from "@reduxjs/toolkit"

var id

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = messageSlice.actions

export const setNotification = (message, seconds) => dispatch => {
  dispatch(setMessage(message))
  clearTimeout(id)
  id = setTimeout(() => {
    dispatch(setMessage(''))
  }, seconds * 1000)
}

export default messageSlice.reducer