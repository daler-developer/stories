import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'redux/reducers/authReducer'
import IconButton from './IconButton'

const Header = () => {

  const dispatch = useDispatch()

  const handleLogoutBtnClick = () => {
    dispatch(authActions.setCurrentUserId(null))
  }

  return (
    <header className="header">
      {/* Left */}
      <div className="header__left"></div>
      {/* Left */}

      {/* Actions */}
      <div className="header__actions">
        <IconButton
          icon="logout"
          color="red"
          size="md"
          className="header__action-btn"
          onClick={handleLogoutBtnClick}
        />
      </div>
      {/* Actions */}
    </header>
  )
}

export default Header
