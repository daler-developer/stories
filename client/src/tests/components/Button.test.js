import { screen } from '@testing-library/react'
import Button from 'components/Button'
import { customRender } from 'tests/utils'

describe('<Button />', () => {
  test('should render', () => {
    customRender(<Button>click here</Button>)
  })

  test('"className" prop should be injected to root element', () => {
    customRender(<Button className="test-class">click here</Button>)

    expect(screen.getByRole('button')).toHaveClass('test-class')
  })

  test('when passed "color" prop, correct class should be generated', () => {
    const btn = customRender(<Button color="blue">click here</Button>)

    expect(screen.getByRole('button')).toHaveClass('button--color--blue')

    btn.rerender(<Button color="light">click here</Button>)

    expect(screen.getByRole('button')).toHaveClass('button--color--light')
  })

  test('when "isLoading" prop is true, loader should be visible', () => {
    customRender(<Button isLoading={true}>click here</Button>)

    expect(screen.queryByRole('loader')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toHaveTextContent('click here')
  })

  test('when "isLoading" prop is false, loader should be hidden', () => {
    customRender(<Button isLoading={false}>click here</Button>)

    expect(screen.queryByRole('loader')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).toHaveTextContent('click here')
  })
})
