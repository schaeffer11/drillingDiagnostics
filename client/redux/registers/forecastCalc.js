import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    oil: {
      eur: 0,
      pdp: 0,
      declineRate: {
        initial: null,
        current: null
      }
    },
    gas: {
      eur: 0,
      pdp: 0,
      declineRate: {
        initial: null,
        current: null
      }
    }
  }))
  .add({
    alias: 'update',
    create: (forecastCalc) => ({
      type: 'UPDATE_FORECAST_CALC',
      forecastCalc
    }),
    reduce: (state, action) => state.mergeDeep(action.forecastCalc)
  })

export default register