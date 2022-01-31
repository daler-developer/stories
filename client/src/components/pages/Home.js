import Loader from 'components/Loader'
import User from 'components/User'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectIsUsersFetching,
  selectUsers,
  selectUsersByUsernameIncludes,
} from 'redux/reducers/usersReducer'
import api from 'utils/api'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const users = useSelector((state) =>
    selectUsersByUsernameIncludes(state, searchInputValue)
  )
  const isFetching = useSelector((state) => selectIsUsersFetching(state))

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

      {/* Loader */}
      {isFetching && <Loader className="home__loader" size="md" color="grey" />}
      {/* Loader */}

      {/* Users */}
      {!isFetching && (
        <div className="home__users">
          {users.map((user) => (
            <User data={user} key={user._id} className="home__user" />
          ))}
        </div>
      )}
      {/* Users */}
      {/* No users label */}
      {/* {users.length === 0 && (
        <div className="home__no-users-label">
          No users
        </div>
      )} */}
      {/* No users label */}
    </div>
  )
}

export default Home
