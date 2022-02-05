import { render, screen } from "@testing-library/react";
import IconButton from "components/IconButton";

describe('<IconButton />', () => {
  
  test('should render correclty', () => {
    render(<IconButton icon="person" />)
  })
  
  test('"className" prop should be injected to root element', () => {
    render(<IconButton className="test-class" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('test-class')
  });
  
  test('passed "color" props should generate correct class in root element', () => {
    const { rerender } = render(<IconButton color="light" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--color--light')

    rerender(<IconButton color="red" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--color--red')
  })

  test('passed "size" prop should generate correct class in root element', () => {
    const { rerender } = render(<IconButton size="md" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--size--md')

    rerender(<IconButton size="sm" icon="person" />)

    expect(screen.getByRole('button')).toHaveClass('icon-button--size--sm')
  })
  
  test('passed "icon" prop should be injected properly', () => {
    render(<IconButton icon="person" />)

    expect(screen.getByRole('icon')).toHaveTextContent('person')
  })

})
