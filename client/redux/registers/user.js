import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(null)
  .add({
    alias: 'login',
    create: user => ({
      type: 'USER_LOGIN',
      user
    }),
    reduce: (state, action) => fromJS(action.user)
  })
  .add({
    alias: 'logout',
    create: () => ({
      type: 'USER_LOGOUT'
    }),
    reduce: state => null
  })
  .add({
    alias: 'refresh',
    create: time => ({
      type: 'USER_REFRESH',
      time
    }),
    reduce: (state, action) => state.set('expires', action.time)
  })
;

export default register
