import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, selectCurrentUserId } from 'redux/reducers/authReducer'
import { selectUserById, usersActions } from 'redux/reducers/usersReducer'
import Avatar from './Avatar'
import IconButton from './IconButton'

const Header = () => {
  const currentUser = useSelector((state) => selectUserById(state, selectCurrentUserId(state)))

  const avatarFileInputRef = useRef(null)

  const dispatch = useDispatch()

  const handleLogoutBtnClick = () => {
    dispatch(authActions.setCurrentUserId(null))

    localStorage.removeItem('auth-token')
  }

  const handleChangeAvatarBtnClick = () => {
    avatarFileInputRef.current.click()
  }

  const handleAvatarFileInputChange = (e) => {
    const file = e.target.files[0]

    const form = new FormData()

    form.append('image', file, file.name)

    dispatch(usersActions.changeAvatar(form))
  }

  return <>
    <header className="header">
      {/* Left */}
      <div className="header__left">
        <Avatar className="header__avatar" user={currentUser} />
      </div>
      {/* Left */}

      {/* Actions */}
      <div className="header__actions">
        <IconButton
          icon="photo_camera"
          color="light"
          className="header__actions-btn header__change-avatar--btn"
          onClick={handleChangeAvatarBtnClick}
        />
        <IconButton
          icon="logout"
          color="red"
          className="header__actions-btn header__logout-btn"
          onClick={handleLogoutBtnClick}
        />
      </div>
      {/* Actions */}
    </header>

    <input type="file" ref={avatarFileInputRef} onChange={handleAvatarFileInputChange} hidden />
  </>
}

export default Header
