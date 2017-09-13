// react & redux
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import API from '../../lib/api-store'
import { Router } from 'react-router';

// helpers
import classNames from 'classnames'

@autobind class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVerifying: false,
      error: undefined
    }
  }

  componentDidMount() {
    console.log('here we go', this.refs, this.props)
    this._isMounted = true
    this.refs.userid.focus()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  attemptLogin(e) {
    console.log('is this an event/', e)
    e.preventDefault()

    let userid = this.refs.userid.value
    let userpwd = this.refs.userpwd.value

    console.log(userid, userpwd, this.refs)

    this.setState({ isVerifying: true, error: false })
    this.forceUpdate()

    API
      .auth({ userid, userpwd })
      .then(user => {
        console.log('attempting login user', userid)
        if (this._isMounted) {
          this.props.loginAction(user)
          this.context.router.push('/')
        }
      })
      .catch(error => {
        if (this._isMounted) {
          console.log('Login Error', error.message)
          this.setState({ isVerifying: false, error })
          this.forceUpdate()
        }
      })
  }

  render() {
    let { error, isVerifying } = this.state

    let errorMessage = error
      ? <p className="error login-error">{error.message}</p>
      : null

    return (
      <form className={classNames('login-form', { error })} onSubmit={this.attemptLogin}>
        <label>
          <span>User ID <small>(usually an email address)</small></span>
          <input type="text" ref="userid" placeholder="Enter a user ID" disabled={isVerifying} />
        </label>

        <label>
          <span>Password</span>
          <input type="password" ref="userpwd" placeholder="Enter your password" disabled={isVerifying} />
        </label>

        <button className={isVerifying ? 'verifying' : ''}>{ isVerifying ? 'Verifying...' : 'Login' }</button>

        {errorMessage}
      </form>
    )
  }
}

export default LoginForm
