import { screen } from '@testing-library/react'
import Icon from 'components/Icon'
import { customRender } from 'tests/utils'

describe('<Icon />', () => {
  test('should customRender', () => {
    customRender(<Icon>person</Icon>)
  })

  test('className should be injected to root element', () => {
    customRender(<Icon className="test-class">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('test-class')
  })

  test('"children" prop should be injected as root element content', () => {
    customRender(<Icon>person</Icon>)

    expect(screen.getByRole('icon')).toHaveTextContent('person')
  })

  test('correct class should be generated for "filled" variant', () => {
    customRender(<Icon variant="filled">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('material-icons')
  })

  test('correct class should be generated for "outlined" variant', () => {
    customRender(<Icon variant="outlined">person</Icon>)

    expect(screen.getByRole('icon')).toHaveClass('material-icons-outlined')
  })
})
