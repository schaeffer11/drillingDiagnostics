// react & redux
import React from 'react'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../redux/helpers'
import classNames from 'classnames'
import appConfig from '../../../app-config.js'

// child components
import Productbar from './ProductBar/index.js'
import ProductSpace from './ProductSpace/ProductSpace'
import LoginForm from '../User/LoginForm'

const App = ({ children, state, actions }) => {
  let { user, app } = state
  let { logout, login } = actions.user
  // let body = !!user ? <ProductSpace/> : <LoginForm loginAction={login} user={user} />

  let body = <ProductSpace />

  return (
    <div className={classNames('spa-app', appConfig.theme || 'dark')}>
      <Productbar app={app}/>
     <ProductSpace />
    </div>
  )
}

export default App

export const AppContainer = connect(
  automapState('user', 'app'),
  automapActions('user', 'app')
)(App)