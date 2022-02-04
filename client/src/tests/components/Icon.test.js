import { render, screen } from '@testing-library/react'
import Icon from 'components/Icon'

describe('Icon', () => {
  
  test('should render', () => {
    render(<Icon>person</Icon>)

    expect(screen.getByRole('icon')).toBeInTheDocument()
  })

  test('className should be injected to root element', () => {
    render(<Icon className="test-class">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('test-class')
  })
  
})
