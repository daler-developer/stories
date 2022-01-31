import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'utils/api'

const fetchStories = createAsyncThunk(
  'users/fetchStories',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/api/stories')

      return { data }
    } catch (e) {
      return thunkAPI.rejectWithValue({ data: e.response.data })
    }
  }
)

const createStory = createAsyncThunk(
  'stories/createStory',
  async (form, thunkAPI) => {
    try {
      const { data } = await api.post('/api/stories', form)

      return { data }
    } catch (e) {
      return thunkAPI.rejectWithValue({ data: e.response.data })
    }
  }
)

const initialState = {
  list: [],
  fetchingStatus: 'idle', // 'idle', 'loading', 'loaded', 'error'
  isCreating: false,
}

const usersSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStories.fulfilled](state, { payload }) {
      state.list.push(...payload.data.stories)
    },
    [createStory.pending](state, { payload }) {
      state.isCreating = true
    },
    [createStory.fulfilled](state, { payload }) {
      state.isCreating = false
      state.list.push(payload.data.story)
    },
    [createStory.rejected](state, { payload }) {
      state.isCreating = false
    },
  },
})

export const selectStories = (state) => {
  return state.stories.list
}

export const selectStoriesByCreatorId = (state, creatorId) => {
  return state.stories.list.filter((story) => story.creatorId === creatorId)
}

export const selectIsCreatingStory = (state) => {
  return state.stories.isCreating
}

export const storiesActions = {
  ...usersSlice.actions,
  fetchStories,
  createStory,
}

export default usersSlice.reducer
