import { bindActionCreators } from 'redux'
import actions from './actions'

export const automapState = (...registers) => state => {
  let propsMap = {}
  registers.forEach(r => {
    propsMap[r] = state.get(r)
  })
  return { state: propsMap }
}

export const automapDispatch = (...registers) => dispatch => {
  let actionsMap = {}
  registers.forEach(r => {
    actionsMap[r] = bindActionCreators(actions[r], dispatch)
  })

  return { actions: actionsMap, dispatch }
}

export const automapActions = automapDispatch // alias
