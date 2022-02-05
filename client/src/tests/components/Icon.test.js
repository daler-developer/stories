import { render, screen } from '@testing-library/react'
import Icon from 'components/Icon'

describe('Icon', () => {
  
  test('should render', () => {
    render(<Icon>person</Icon>)
  })

  test('className should be injected to root element', () => {
    render(<Icon className="test-class">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('test-class')
  })

  test('"children" prop should be injected as root element content', () => {
    render(<Icon>person</Icon>);

    expect(screen.getByRole('icon')).toHaveTextContent('person')
  })

  test('correct class should be generated for "filled" variant', () => {
    render(<Icon variant="filled">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('material-icons')
  })

  test('correct class should be generated for "outlined" variant', () => {
    render(<Icon variant="outlined">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('material-icons-outlined')
  })


  
})
