import useOnClickOutside from 'hooks/useOnOutsideClick'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, selectCurrentUserId } from 'redux/reducers/authReducer'
import { selectUserById, usersActions } from 'redux/reducers/usersReducer'
import Avatar from './Avatar'
import Icon from './Icon'
import IconButton from './IconButton'

const Header = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const currentUser = useSelector((state) => selectUserById(state, selectCurrentUserId(state)))

  const avatarFileInputRef = useRef(null)
  const menuRef = useRef(null)

  useOnClickOutside(menuRef, () => setIsMenuHidden(true), [!isMenuHidden])

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
  
  const handleOpenMenuBtnClick = () => {
    if (isMenuHidden) setIsMenuHidden(false)
  }

  return <>
    <header className="header">
      {/* Title */}
      <h1 className="header__title">
        Stories
      </h1>
      {/* Title */}

      {/* Body */}
      <div className="header__body">
        <Avatar
          className="header__avatar"
          user={currentUser}
        />
        <div className="header__menu-wrapper">
          <IconButton
            icon="arrow_drop_down"
            color="light"
            className="header__open-menu-btn"
            onClick={handleOpenMenuBtnClick}
          />
          {!isMenuHidden && (
            <div className="header__menu" ref={menuRef}>
              <button type="button" className="header__menu-btn" onClick={handleChangeAvatarBtnClick}>
                <Icon>person</Icon>
                Change avatar
              </button>
              <button type="button" className="header__menu-btn" onClick={handleLogoutBtnClick}>
                <Icon>logout</Icon>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Body */}
    </header>

    <input accept="image/*" type="file" ref={avatarFileInputRef} onChange={handleAvatarFileInputChange} hidden />
  </>
}

export default Header
