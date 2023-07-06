import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props

    history.replace('/')
  }

  return (
    <div className="header-component">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        onClick={onClickLogo}
        className="web-logo"
      />
      <div className="link-container">
        <Link to="/" className="link-item">
          Home
        </Link>
        <Link to="/jobs" className="link-item">
          Job
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
