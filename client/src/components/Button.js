import classNames from 'classnames'
import pt from 'prop-types'

const Button = ({
  children,
  isLoading,
  className,
  classes,
  color,
  ...rest
}) => {
  return (
    <button
      type="submit"
      className={classNames('button', `button--color--${color}`, className)}
      {...rest}
    >
      {isLoading ? (
        <div className={classNames('button__loader', classes?.loader)} />
      ) : (
        children
      )}
    </button>
  )
}

Button.defaultProps = {
  color: 'blue',
}

Button.propTypes = {
  children: pt.any.isRequired,
  isLoading: pt.bool,
  className: pt.string,
  classes: pt.shape({
    root: pt.string,
    loader: pt.string,
  }),
  color: pt.oneOf(['blue', 'light']),
}

export default Button
