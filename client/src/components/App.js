import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  authActions,
  selectIsAuthenticated,
  selectIsLoggingInWithToken,
} from 'redux/reducers/authReducer'
import { storiesActions } from 'redux/reducers/storiesReducer'
import { usersActions } from 'redux/reducers/usersReducer'
import Alert from './Alert'
import AppRoutes from './AppRoutes'
import FullScreenLoader from './FullScreenLoader'
import StoriesPanel from './StoriesPanel'

const App = () => {
  const isAuthenticated = useSelector((state) => selectIsAuthenticated(state))
  const isLoggingInWithToken = useSelector((state) =>
    selectIsLoggingInWithToken(state)
  )

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(usersActions.fetchUsers())
      dispatch(storiesActions.fetchStories())
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

  if (isLoggingInWithToken) {
    return <FullScreenLoader />
  }

  return (
    <>
      <AppRoutes />
      <Alert />
      <StoriesPanel />
    </>
  )
}

export default App
