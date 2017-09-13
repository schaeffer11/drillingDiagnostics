import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    selectedForecasts: [],
    phase: ['oil', 'gas']
  }))
  .add({
    alias: 'updateSelected',
    create: (selected) => ({
      type: 'UPDATE_SELECTED',
      selected
    }),
    reduce: (state, action) => {
      return state.set('selectedForecasts', fromJS(action.selected))
    }
  })
  .add({
    alias: 'updatePhase',
    create: (phase) => ({
      type: 'UPDATE_PHASE',
      phase
    }),
    reduce: (state, action) => state.set('phase', fromJS(action.phase))
  })

export default register