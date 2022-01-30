import { render } from 'react-dom'
import React from 'react'
import App from 'components/App'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import { Provider } from 'react-redux'
import store from 'redux/store'

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
