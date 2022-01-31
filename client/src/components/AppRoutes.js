import { Routes, Route, Navigate } from 'react-router-dom'
import AuthProtected from './AuthProtected'
import Layout from './Layout'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />

      <Route path="auth" element={<Auth />} />

      <Route element={<AuthProtected children={<Layout />} />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
