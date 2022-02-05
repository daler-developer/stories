import { screen } from '@testing-library/react'
import IconButton from 'components/IconButton'
import { customRender } from 'tests/utils'

describe('<IconButton />', () => {
  test('should customRender correclty', () => {
    customRender(<IconButton icon="person" />)
  })

  test('"className" prop should be injected to root element', () => {
    customRender(<IconButton className="test-class" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('test-class')
  })

  test('passed "color" props should generate correct class in root element', () => {
    const { recustomRender } = customRender(
      <IconButton color="light" icon="person" />
    )

    expect(screen.getByRole('button')).toHaveClass('icon-button--color--light')

    recustomRender(<IconButton color="red" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--color--red')
  })

  test('passed "size" prop should generate correct class in root element', () => {
    const { recustomRender } = customRender(
      <IconButton size="md" icon="person" />
    )

    expect(screen.getByRole('button')).toHaveClass('icon-button--size--md')

    recustomRender(<IconButton size="sm" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--size--sm')
  })

  test('passed "icon" prop should be injected properly', () => {
    customRender(<IconButton icon="person" />)

    expect(screen.getByRole('icon')).toHaveTextContent('person')
  })
})
