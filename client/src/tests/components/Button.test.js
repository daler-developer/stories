import { render, screen } from "@testing-library/react";
import Button from "components/Button";

describe('<Button />', () => {
  
  test('should render', () => {
    render((
      <Button>
        click here
      </Button>)
    )
  });

  test('"className" prop should be injected to root element', () => {
    render((
      <Button className="test-class">
        click here
      </Button>)
    )

    expect(screen.getByRole('button')).toHaveClass('test-class')
  });
  
  test('when passed "color" prop, correct class should be generated', () => {
    const btn = render((
      <Button color="blue">
        click here
      </Button>)
    )

    expect(screen.getByRole('button')).toHaveClass('button--color--blue')

    btn.rerender((
      <Button color="light">
        click here
      </Button>
    ))

    expect(screen.getByRole('button')).toHaveClass('button--color--light')
  });
  
  test('when "isLoading" prop is true, loader should be visible', () => {
    render((
      <Button isLoading={true}>
        click here
      </Button>)
    )

    expect(screen.queryByRole('loader')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toHaveTextContent('click here')
  });

  test('when "isLoading" prop is false, loader should be hidden', () => {
    render((
      <Button isLoading={false}>
        click here
      </Button>)
    )

    expect(screen.queryByRole('loader')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).toHaveTextContent('click here')
  });
  
  
});
