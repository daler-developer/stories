import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions, selectIsAuthenticated } from 'redux/reducers/authReducer'
import { storiesActions } from 'redux/reducers/storiesReducer'
import { usersActions } from 'redux/reducers/usersReducer'
import Alert from './Alert'
import AppRoutes from './AppRoutes'
import StoriesPanel from './StoriesPanel'

const App = () => {
  const isAuthenticated = useSelector((state) => selectIsAuthenticated(state))

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(usersActions.fetchUsers({ excludeCurrent: true }))
      dispatch(storiesActions.fetchStories())
      navigate('/home')
    } else {
  
    }
  }, [isAuthenticated])

  useEffect(() => {
    tryLoginWithToken()
  }, [])

  const tryLoginWithToken = () => {
    if (localStorage.getItem('auth-token')) {
      dispatch(authActions.loginWithToken(localStorage.getItem('auth-token')))
    }
  }

  return (
    <>
      <AppRoutes />
      {/* <Alert /> */}
      <StoriesPanel />
    </>
  )
}

export default App
