import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    'Gas Rate': true,
    'Oil Rate': true,
    'Water Cut': true,
    'Gas Forecast': true,
    'Oil Forecast': true
  }))
  .add({
    alias: 'filterSeries',
    create: (series) => ({
      type: 'FILTER_SERIES',
      series
    }),
    reduce: (state, action) => {
      //  initially set all to false
      const seriesToPlot = {
        'Gas Rate': false,
        'Oil Rate': false,
        'Water Cut': false,
        'Gas Forecast': false,
        'Oil Forecast': false
      }
      //  toggle true if the series is selected
      for (let series in seriesToPlot) {
        for (let option of action.series) {
          if (series === option.value) {
            seriesToPlot[option.value] = true
          }
        }
      }

      return fromJS(seriesToPlot)
    }
  })


export default register