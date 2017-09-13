import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    theme: 'light',
    chartFontSize: 1
  }))
  .add({
    alias: 'toggleTheme',
    create: () => ({
      type: 'TOGGLE_THEME',
    }),
    reduce: (state, action) => state.get('theme') === 'light' ? state.set('theme', 'dark') : state.set('theme', 'light')
  })
  .add({
    alias: 'setChartFontSize',
    create: (fontSize) => ({
      type: 'TOGGLE_CHART_FONT_SIZE',
      fontSize
    }),
    reduce: (state, action) => state.set('chartFontSize', action.fontSize)
  })

export default register