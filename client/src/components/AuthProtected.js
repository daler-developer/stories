import { useSelector } from 'react-redux'
import { useLocation, Navigate, Route } from 'react-router-dom'
import {
  selectIsAuthenticated,
  selectIsLoggingInWithToken,
} from 'redux/reducers/authReducer'
import FullScreenLoader from './FullScreenLoader'

const AuthProtected = ({ children }) => {
  let location = useLocation()

  const isAuthenticated = useSelector((state) => selectIsAuthenticated(state))
  const isLoggingInWithToken = useSelector((state) =>
    selectIsLoggingInWithToken(state)
  )

  if (!isAuthenticated && isLoggingInWithToken) {
    return <FullScreenLoader />
  }

  if (!isAuthenticated && !isLoggingInWithToken) {
    return <Navigate to="/auth?tab=login" state={{ from: location }} />
  }

  return children
}

export default AuthProtected
