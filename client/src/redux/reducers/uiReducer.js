import { createSlice } from '@reduxjs/toolkit'
import { authActions } from './authReducer'

const initialState = {
  alert: {
    type: null,
    text: null,
    isHidden: true,
  },
  storiesPanel: {
    isHidden: true,
    selectedUserId: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAlert(state, { payload }) {
      state.alert.type = payload.type
      state.alert.text = payload.text
      state.alert.isHidden = false
    },
    closeAlert(state) {
      state.alert.type = null
      state.alert.text = null
      state.alert.isHidden = true
    },
    openStoriesPanel(state, { payload }) {
      state.storiesPanel.isHidden = false
      state.storiesPanel.selectedUserId = payload
    },
    closeStoriesPanel(state) {
      state.storiesPanel.isHidden = true
      state.selectedUserId = null
    },
  },
  extraReducers: {},
})

export const selectAlert = (state) => {
  return state.ui.alert
}

export const selectStoriesPanel = (state) => {
  return state.ui.storiesPanel
}

export const uiActions = {
  ...uiSlice.actions,
}

export default uiSlice.reducer
