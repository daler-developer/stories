import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = ({}) => {
  return (
    <div className="layout">
      {/* Body */}
      <div className="layout__body">
        <Header />
        <Outlet />
        <Footer />
      </div>
      {/* Body */}
    </div>
  )
}

export default Layout
