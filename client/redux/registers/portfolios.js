import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    current: 0,
    available: [],
    gotPortfolios: false
  }))
  .add({
    alias: 'setCurrentPortfolio',
    create: portfolio => {
      return {
        type: 'SET_CURRENT_PORTFOLIO',
        portfolio
      }
    },
    reduce: (state, action) => {
      return state.set('current', fromJS(action.portfolio))
    }
  })
  .add({
    alias: 'setAvailablePortfolios',
    create: (portfolios, current) => {
      return {
        type: 'SET_AVAILABLE_PORTFOLIOS',
        portfolios,
        current
      }
    },
    reduce: (state, action) => state.set('available', fromJS(action.portfolios)).set('current', fromJS(action.current)).set('gotPortfolios', true)
  })
  .add({
    alias: 'finishedGettingFilterData',
    create: () => {
      return {
        type: 'FINISHED_GETTING_FILTER_DATA'
      }
    },
    reduce: (state, action) => state.set('gotPortfolios', false)
  })
export default register