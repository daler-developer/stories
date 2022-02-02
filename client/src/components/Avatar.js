import pt from 'prop-types'
import userImg from 'assets/user.png'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectStories } from 'redux/reducers/storiesReducer'
import { useMemo } from 'react'
import { uiActions } from 'redux/reducers/uiReducer'

const Avatar = ({ user, size, className, ...rest }) => {
  const stories = useSelector((state) => selectStories(state))

  const dispatch = useDispatch()

  const hasStories = useMemo(
    () => stories.some((story) => story.creatorId === user._id),
    [stories]
  )

  const handleAvatarClick = () => {
    if (hasStories) dispatch(uiActions.openStoriesPanel(user._id))
  }

  return (
    <div onClick={handleAvatarClick} className={classNames('avatar', size && `avatar--size--${size}`, { 'avatar--with-stories': hasStories }, className)}>
      {/* Img */}
      <img
        {...rest}
        src={user.avatarUrl || userImg}
        className={classNames('avatar__img')}
      />
      {/* Img */}
    </div>
  )
}


Avatar.propTypes = {
  user: pt.object.isRequired,
  className: pt.string,
  size: pt.oneOf(['sm', 'md', 'lg']),
}

export default Avatar
