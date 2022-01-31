import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import storiesReducer from './reducers/storiesReducer'
import uiReducer from './reducers/uiReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    users: usersReducer,
    stories: storiesReducer,
  },
})

export default store
