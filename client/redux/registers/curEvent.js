import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(Map({
    time: '',
    comments: '',
    index: undefined
  }))
  .add({
    alias: 'setEvent',
    create: (event, index) => ({
      type: 'SET_EVENT',
      event,
      index
    }),
    reduce: (state, action) => fromJS({
      ...action.event,
      index: action.index
    })
  })
  .add({
    alias: 'updateTime',
    create: (time) => ({
      type: 'UPDATE_TIME',
      time
    }),
    reduce: (state, action) => state.set('time', action.time)
  })
  .add({
    alias: 'updateComments',
    create: (comments) => ({
      type: 'UPDATE_EVENT_COMMENTS',
      comments
    }),
    reduce: (state, action) => state.set('comments', action.comments)
  })
  .add({
    alias: 'clearEvent',
    create: () => ({
      type: 'CLEAR_EVENT'
    }),
    reduce: (state, action) => Map({
      time: '',
      comments: '',
      index: undefined
    })
  })
export default register