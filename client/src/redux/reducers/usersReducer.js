import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authActions, selectCurrentUserId } from 'redux/reducers/authReducer'
import api from 'utils/api'

const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ excludeCurrent }, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/api/users${excludeCurrent ? `?excludeCurrent=yes` : ''}`
      )

      return { data }
    } catch (e) {
      thunkAPI.dispatch(
        uiActions.openAlert({ type: 'error', text: e.response.data.message })
      )
      return thunkAPI.rejectWithValue({ data: e.respones.data })
    }
  }
)

const changeAvatar = createAsyncThunk('users/changeAvatar', async (form, thunkAPI) => {
  try {
    const _id = selectCurrentUserId(thunkAPI.getState())

    const { data } = await api.post(`/api/users/${_id}/change-avatar`, form)

    return { data }
  } catch (e) {
    console.log(e.response)
    return thunkAPI.rejectWithValue({ data: e.respones.data })
  }
})

const initialState = {
  list: [],
  isFetching: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending](state, { payload }) {
      state.isFetching = true
    },
    [fetchUsers.fulfilled](state, { payload }) {
      state.list.push(...payload.data.users)
      state.isFetching = false
    },
    [fetchUsers.rejected](state, { payload }) {
      state.isFetching = false
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
    [changeAvatar.fulfilled](state, { payload }) {
      const index = state.list.findIndex((user) => user._id === payload.data.user._id)

      state.list[index] = payload.data.user
    }
  },
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

export const selectIsUsersFetching = (state) => {
  return state.users.isFetching
}

export const selectUsersByUsernameIncludes = (state, username) => {
  return state.users.list.filter((user) => user.username.includes(username))
}

export const usersActions = {
  ...usersSlice.actions,
  fetchUsers,
  changeAvatar
}

export default usersSlice.reducer
