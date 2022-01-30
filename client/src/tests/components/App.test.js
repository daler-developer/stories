import App from '../../components/App.js'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('<App />', () => {
  test('should render', () => {
    render(<App />)
  })
})
