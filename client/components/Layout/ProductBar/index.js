// react & redux
import React from 'react'

// child components
import ProductbarActions from './Actions'

const Productbar = ({ app, user, logoutAction }) => {
  let productBarActions = user ? <ProductbarActions user={user} logoutAction={logoutAction} /> : ''

  return (
    <div className="productbar dark">
    <div className="title">
      <span>
        <strong dangerouslySetInnerHTML={{ __html: app.get('title') + '\u2122'}}></strong>
        <small className="version">{app.get('version')}</small>
      </span>
    </div>
    { productBarActions } 
  </div>
  )
}

export default Productbar
