// core modules & classes
import { Map } from 'immutable'

import app from './app'
import user from './user'
import wellSelection from './wellSelection'
import curEvent from './curEvent'
import curAction from './curAction'
import forecastSelection from './forecastSelection'
import forecastCalc from './forecastCalc'
import wellData from './wellData'
import portfolios from './portfolios'
import filters from './filters'
import theme from './theme'
import selectedSeries from './selectedSeries'
import userActions from './userActions'
export default Map({
  app,
  user,
  wellSelection,
  curEvent,
  curAction,
  forecastSelection,
  forecastCalc,
  wellData,
  portfolios,
  filters,
  theme,
  selectedSeries,
  userActions
})