import IconButton from 'components/IconButton'
import Loader from 'components/Loader'
import User from 'components/User'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCurrentUserId } from 'redux/reducers/authReducer'
import { storiesActions } from 'redux/reducers/storiesReducer'
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

  const users = useSelector((state) => selectUsers(state))
  const currentUserId = useSelector((state) => selectCurrentUserId(state))
  const isFetching = useSelector((state) => selectIsUsersFetching(state))

  const filteredUsers = useMemo(() => {
    const filteredBySearchValue = users.filter((user) =>
      user.username.includes(searchInputValue)
    )
    const filteredByCurrentExcluded = filteredBySearchValue.filter(
      (user) => user._id !== currentUserId
    )

    return filteredByCurrentExcluded
  }, [users])

  const handleReloadBtnClick = () => {
    dispatch(usersActions.fetchUsers())
    dispatch(storiesActions.fetchStories())
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
        {isFetching && (
          <Loader className="home__loader" size="md" color="grey" />
        )}
        {/* Loader */}

        {/* Users */}
        {!isFetching && (
          <div className="home__users">
            {filteredUsers.map((user) => (
              <User
                data={user}
                key={user_id}
                key={user._id}
                className="home__user"
              />
            ))}
          </div>
        )}
        {/* Users */}

        {/* Reload */}
        {!isFetching && (
          <IconButton
            onClick={handleReloadBtnClick}
            type="button"
            className="home__reload-btn"
            color="light"
            icon="refresh"
            size="md"
          />
        )}
        {/* Reload */}
      </div>
      {/* Body */}
    </div>
  )
}

export default Home
