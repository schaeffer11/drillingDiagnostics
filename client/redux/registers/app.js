import ReduxRegistry from 'redux-registry'
import { fromJS, Map } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(Map())
  .add({
    alias: 'set',
    create: version => ({
      type: 'SET_VERSION',
      version
    }),
    reduce: (state, action) => fromJS(action.version)
  })
;

export default register
