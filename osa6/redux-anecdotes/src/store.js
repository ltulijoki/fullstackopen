import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer
  }
})

export default store