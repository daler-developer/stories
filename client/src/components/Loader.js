import classNames from 'classnames'
import pt from 'prop-types'

const Loader = ({ size, color, className }) => {
  return (
    <div
      className={classNames(
        'loader',
        `loader--size--${size}`,
        `loader--color--${color}`,
        className
      )}
    />
  )
}

Loader.defaultProps = {
  size: 'md',
  color: 'black',
}

Loader.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['black', 'white', 'grey']),
  className: pt.string,
}

export default Loader
