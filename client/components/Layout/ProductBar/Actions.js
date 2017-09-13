// react & redux
import React from 'react'
import { Link } from 'react-router'

const ProductbarActions = ({ user, logoutAction }) => {
  function logOut() {
    API.logout().then(data => {
      logoutAction()
    }).catch(err => {
      logoutAction()
    })
  }

  const loginLink = user
    ? <Link to="/logout" className="logout" onClick={logOut}>Log Out</Link>
    : <Link to="/login" className="login">Log In</Link>

  return (
    <div className="actions">
      { loginLink }
    </div>
  )
}

export default ProductbarActions
