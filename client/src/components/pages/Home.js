import User from "components/User"
import { useSelector } from "react-redux"
import { selectUsers } from "redux/reducers/usersReducer"
import api from "utils/api"


const Home = () => {
  const users = useSelector((state) => selectUsers(state))

  return (
    <div className="home">
      {/* Users */}
      <div className="home__users">
        {users.map((user) => (
          <User 
            data={user} 
            key={user._id} 
            className="home__user"
          />
        ))}
      </div>
      {/* Users */}
    </div>
  )
}

export default Home
