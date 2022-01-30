import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authActions } from 'redux/reducers/authReducer'
import api from 'utils/api'


const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ excludeCurrent }, thunkAPI) => {
  try {    
    const { data } = await api.get(`/api/users${excludeCurrent ? `?excludeCurrent=yes` : ''}`)

    return { data }
  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))
    return thunkAPI.rejectWithValue({ data: e.respones.data })
  }
})


const initialState = {
  list: [],
  fetchingStatus: 'idle', // 'idle', 'loading', 'loaded', 'error'
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchUsers.pending](state, { payload }) {
      state.fetchingStatus = 'loading'
    },
    [fetchUsers.fulfilled](state, { payload }) {
      state.list.push(...payload.data.users)
      state.fetchingStatus = 'loaded'
    },
    [fetchUsers.rejected](state, { payload }) {
      state.fetchingStatus = 'error'
    },
    [authActions.register.fulfilled](state, { payload }) {
      state.list.push(payload.data.user)
    },
    [authActions.login.fulfilled](state, { payload }) {
      state.list.push(payload.data.user)
    },
    [authActions.loginWithToken.fulfilled](state, { payload }) {
      state.list.push(payload.data.user)
    },
  }
})

export const selectUsers = (state) => {
  return state.users.list
}

export const selectUsersFetchingStatus = (state) => {
  return state.users.fetchingStatus
}

export const selectUserById = (state, _id) => {
  return state.users.list.find((user) => user._id === _id)
}

export const usersActions = {
  ...usersSlice.actions,
  fetchUsers,
}

export default usersSlice.reducer