import classNames from 'classnames'
import pt from 'prop-types'

const Loader = ({ size, color, className }) => {
  return (
    <div
      role="loader"
      className={classNames(
        'loader',
        size && `loader--size--${size}`,
        color && `loader--color--${color}`,
        className
      )}
    />
  )
}

Loader.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['black', 'white', 'grey']),
  className: pt.string,
}

export default Loader
