import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    savedForecasts: []
  }))
  .add({
    alias: 'updateSavedForecasts',
    create: (uniqueID) => ({
      type: 'UPDATE_SAVED_FORECASTS',
      uniqueID
    }),
    reduce: (state, action) => {
      let uniqueIDExists = state.get('savedForecasts').toJS().includes(action.uniqueID)
      return uniqueIDExists ? state : state.update('savedForecasts', savedForecasts => savedForecasts.push(action.uniqueID))
    }
  })
  .add({
    alias: 'resetSavedForecasts',
    create: () => ({
      type: 'RESET_SAVED_FORECASTS'
    }),
    reduce: (state) => {
      return state.set('savedForecasts', fromJS([]))
    }
  })

export default register