import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "utils/api"
import { uiActions } from "./uiReducer"


const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const { data } = await api.post('/api/auth/login', {
      username, password
    })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: data.message }))

    localStorage.setItem('auth-token', data.token)

    return { data }
  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))
    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const loginWithToken = createAsyncThunk('auth/loginWithToken', async (token, thunkAPI) => {
  try {
    const { data } = await api.post('/api/auth/login-with-token', {
      token
    })
    
    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: data.message }))
    
    return { data }
  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const register = createAsyncThunk('auth/register', async ({ username, password }, thunkAPI) => {
  try {
    const { data } = await api.post('/api/auth/register', {
      username, password
    })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: data.message }))

    localStorage.setItem('auth-token', data.token)

    return { data }
  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))
    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})


const initialState = {
  currentUserId: null,
  isTryingToLogin: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserId(state, { payload }) {
      state.currentUserId = payload
    }
  },
  extraReducers: {
    [login.fulfilled](state, { payload }) {
      state.currentUserId = payload.data.user._id
    },
    [register.fulfilled](state, { payload }) {
      state.currentUserId = payload.data.user._id
    },
    [loginWithToken.fulfilled](state, { payload }) {
      state.currentUserId = payload.data.user._id
    },
    [loginWithToken.pending](state, { payload }) {
      state.isTryingToLogin = true
    },
    [loginWithToken.fulfilled](state, { payload }) {
      state.currentUserId = payload.data.user._id
      state.isTryingToLogin = false
    },
    [loginWithToken.rejected](state, { payload }) {
      state.isTryingToLogin = false
    },
  }
})

export const selectCurrentUserId = (state) => {
  return state.auth.currentUserId
}

export const selectIsAuthenticated = (state) => {
  return Boolean(state.auth.currentUserId)
}

export const selectIsTryingToLogin = (state) => {
  return state.auth.isTryingToLogin
}

export const authActions = {
  ...authSlice.actions,
  login,
  loginWithToken,
  register
}

export default authSlice.reducer;