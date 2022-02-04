import IconButton from 'components/IconButton'
import Loader from 'components/Loader'
import User from 'components/User'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCurrentUserId } from 'redux/reducers/authReducer'
import {
  selectIsUsersFetching,
  selectUserById,
  selectUsers,
  selectUsersByUsernameIncludes,
  usersActions,
} from 'redux/reducers/usersReducer'


const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const dispatch = useDispatch()

  const users = useSelector((state) =>
    selectUsersByUsernameIncludes(state, searchInputValue)
  )
  const currentUserId = useSelector((state) => selectCurrentUserId(state))
  const isFetching = useSelector((state) => selectIsUsersFetching(state))
  
  const handleReloadBtnClick = () => {
    dispatch(usersActions.fetchUsers())
  }

  return (
    <div className="home">
      {/* Search */}
      <input
        placeholder="Search"
        type="text"
        className="home__search-input"
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      {/* Search */}

      {/* Body */}
      <div className="home__body">
        {/* Loader */}
        {isFetching && <Loader className="home__loader" size="md" color="grey" />}
        {/* Loader */}

        {/* Users */}
        {!isFetching && (
          <div className="home__users">
            {users.map((user) => (
              <User data={user} key={user_id} key={user._id} className="home__user" />
            ))}
          </div>
        )}
        {/* Users */}

        {/* Reload */}
        {!isFetching && (
          <IconButton onClick={handleReloadBtnClick} type="button" className="home__reload-btn" color="light" icon="refresh" size="md" />
        )}
        {/* Reload */}
      </div>
      {/* Body */}

    </div>
  )
}

export default Home
