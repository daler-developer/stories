import pt from 'prop-types'
import userImg from 'assets/user.png'
import classNames from 'classnames';

const Avatar = ({ src, size, className, ...rest }) => {
  return (
    <img 
      {...rest}
      src={src || userImg} 
      className={classNames('avatar', className, { 'avatar--size--md': size === 'md' })}
    />
  )
};

Avatar.defaultProps = {
  size: 'md'
}

Avatar.propTypes = {
  src: pt.string,
  className: pt.string,
  size: pt.oneOf(['sm', 'md', 'lg'])
}

export default Avatar;
