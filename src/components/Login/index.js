import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    password: '',
    username: '',
    errMsg: '',
    showSubmitError: false,
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errMsg} = this.state

    const token = Cookies.get('jwt_token')
    console.log(token)

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-container">
          <form onSubmit={this.onSubmitForm}>
            <div className="image-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </div>

            <div className="input-element">
              <label htmlFor="username" className="label-container">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="password-con"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-element">
              <label htmlFor="password" className="label-container">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                className="password-con"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            {showSubmitError ? <p className="error-msg">*{errMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
