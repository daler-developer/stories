import userImg from 'assets/user.png'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectStories } from 'redux/reducers/storiesReducer'
import { uiActions } from 'redux/reducers/uiReducer'
import Avatar from './Avatar'

const User = ({ data, className }) => {
  const stories = useSelector((state) => selectStories(state))

  const dispatch = useDispatch()

  const hasStories = useMemo(
    () => stories.some((story) => story.creatorId === data._id),
    [stories]
  )

  const handleAvatarClick = () => {
    if (hasStories) dispatch(uiActions.openStoriesPanel(data._id))
  }

  return (
    <div
      className={classNames(
        'user',
        { 'user--with-stories': hasStories },
        className
      )}
    >
      {/* Avatar */}
      <Avatar className="user__avatar" user={data} />
      {/* Avatar */}

      {/* Username */}
      <div className="user__username">{data.username}</div>
      {/* Username */}
    </div>
  )
}

export default User
