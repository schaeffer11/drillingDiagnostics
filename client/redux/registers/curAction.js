import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    userID: '',
    time: '',
    comments: '',
    index: undefined
  }))
  .add({
    alias: 'setAction',
    create: (action, index) => ({
      type: 'SET_ACTION',
      action,
      index
    }),
    reduce: (state, action) => {
      return Map(action.action).set('index', action.index)
    }
  })
  .add({
    alias: 'updateComments',
    create: (comments) => ({
      type: 'UPDATE_ACTION_COMMENTS',
      comments
    }),
    reduce: (state, action) => state.set('comments', action.comments)
  })
  .add({
    alias: 'clearAction',
    create: () => ({
      type: 'CLEAR_ACTION',
    }),
    reduce: (state, action) => Map({
      userID: '',
      time: '',
      comments: '',
      index: undefined
    })
  })

export default register
