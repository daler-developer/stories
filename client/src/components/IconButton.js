import Icon from './Icon'
import pt from 'prop-types'
import classNames from 'classnames'

const IconButton = ({ className, icon, size, color, ...rest }) => {
  return (
    <button
      {...rest}
      className={classNames(
        'icon-button',
        `icon-button--color--${color}`,
        `icon-button--size--${size}`,
        className
      )}
    >
      <Icon>{icon}</Icon>
    </button>
  )
}

IconButton.defaultProps = {
  color: 'light',
  size: 'md'
}

IconButton.propsTypes = {
  className: pt.string,
  icon: pt.string.isRequired,
  color: pt.oneOf(['light', 'red']),
  size: pt.oneOf(['sm', 'md', 'lg']),
}

export default IconButton
