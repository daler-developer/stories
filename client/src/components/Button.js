import classNames from 'classnames'
import pt from 'prop-types'
import { useMemo } from 'react'
import Loader from './Loader'

const Button = ({ children, isLoading, className, color, ...rest }) => {
  const loaderColor = useMemo(() => {
    if (color === 'black') {
      return 'white'
    } else if (color === 'light') {
      return 'black'
    }
  }, [color])

  return (
    <button
      type="submit"
      className={classNames(
        'button',
        color && `button--color--${color}`,
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Loader color={loaderColor} className={classNames('button__loader')} />
      ) : (
        children
      )}
    </button>
  )
}

Button.propTypes = {
  children: pt.any.isRequired,
  isLoading: pt.bool,
  className: pt.string,
  color: pt.oneOf(['blue', 'light']),
}

export default Button
