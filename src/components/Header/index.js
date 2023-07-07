import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  //   const onClickLogo = () => {
  //     const {history} = props

  //     history.replace('/')
  //   }

  return (
    <nav>
      <div className="header-component">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            //   onClick={onClickLogo}
            className="web-logo"
          />
        </Link>
        <ul className="link-container">
          <Link to="/" className="link-item">
            <li className="linkitem">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="linkitem">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
