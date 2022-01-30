import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'utils/api'



const fetchStories = createAsyncThunk('users/fetchStories', async (arg, thunkAPI) => {
  try {
    const { data } = await api.get('/api/stories')

    return { data }
  } catch (e) {
    return thunkAPI.rejectWithValue({ data: e.respones.data })
  }
})

const initialState = {
  list: [],
  fetchingStatus: 'idle', // 'idle', 'loading', 'loaded', 'error'
}

const usersSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchStories.fulfilled](state, { payload }) {
      state.list.push(...payload.data.stories)
    }
  }
})

export const selectStories = (state) => {
  return state.stories.list
}

export const selectStoriesByCreatorId = (state, creatorId) => {
  return state.stories.list.filter((story) => story.creatorId === creatorId)
}

export const storiesActions = {
  ...usersSlice.actions,
  fetchStories
}

export default usersSlice.reducer