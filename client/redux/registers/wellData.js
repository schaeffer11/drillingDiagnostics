import ReduxRegistry from 'redux-registry'
import { fromJS, toJS, Map } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    original: {
      forc: {
        userID: undefined,
        date: undefined,
        declineType: 0,
        oilDCA: {
          qi: undefined,
          di: undefined,
          b: undefined,
          years: undefined,
          eur: undefined,
          tStart: ''
        },
        gasDCA: {
          qi: undefined,
          di: undefined,
          b: undefined,
          years: undefined,
          eur: undefined,
          tStart: ''
        }
      },
      events: [],
      actions: [],
      forecasts: []
    },
    wellAttrs: {
      uniqueID: '',
      name: '',
      field: '',
      reservoir: '',
      operator: '',
      type: '',
      spudDate: '',
      cumOil: 0,
      cumGas: 0
    },
    forc: {
      userID: undefined,
      date: undefined,
      declineType: 0,
      oilDCA: {
        qi: undefined,
        di: undefined,
        b: undefined,
        years: undefined,
        eur: undefined,
        tStart: ''
      },
      gasDCA: {
        qi: undefined,
        di: undefined,
        b: undefined,
        years: undefined,
        eur: undefined,
        tStart: ''
      },
      forcChanged: false
    },
    prod: [],
    events: [],
    actions: [],
    forecasts: [],
    selectedTableRow: undefined
  }))
  .add({
    alias: 'setCurWellData',
    create: (data) => ({
      type: 'SET_CURRENT_WELL_DATA',
      data
    }),
    reduce: (state, action) => fromJS(action.data)
  })
  .add({
    alias: 'resetOriginal',
    create: () => ({
      type: 'RESET_ORIGINAL_WELL_DATA'
    }),
    reduce: (state) => state.set('original', fromJS({ forc: state.get('forc'), events: state.get('events'), actions: state.get('actions'), forecasts: state.get('forecasts') }))
  })
  .add({
    alias: 'addEvent',
    create: (event) => ({
      type: 'ADD_EVENT',
      event
    }),
    reduce: (state, action) => {
      return state.update('events', events => events.push(fromJS(action.event)).sort((a, b) => { // Highcharts series returns error if data points are not in order
        return new Date(a.get('time')) - new Date(b.get('time'))
      }))
    }
  })
  .add({
    alias: 'removeEvent',
    create: (index) => ({
      type: 'REMOVE_EVENT',
      index
    }),
    reduce: (state, action) => state.update('events', events => events.remove(action.index))
  })
  .add({
    alias: 'updateEvent',
    create: (index, event) => ({
      type: 'UPDATE_EVENT',
      index,
      event
    }),
    reduce: (state, action) => state.update('events', events => events.set(action.index, fromJS(action.event)))
  })

  .add({
    alias: 'addAction',
    create: (action) => ({
      type: 'ADD_ACTION',
      action
    }),
    reduce: (state, action) => state.update('actions', actions => actions.push(fromJS(action.action)))
  })
  .add({
    alias: 'addForecast',
    create: (forecast) => ({
      type: 'ADD_FORECAST',
      forecast
    }),
    reduce: (state, action) => state.update('forecasts', forecast => forecast.push(fromJS(action.forecast)))
  })
  .add({
    alias: 'removeAction',
    create: (index) => ({
      type: 'REMOVE_ACTION',
      index
    }),
    reduce: (state, action) => state.update('actions', actions => actions.remove(action.index))
  })
  .add({
    alias: 'updateAction',
    create: (index, action) => ({
      type: 'UPDATE_ACTION',
      index,
      action
    }),
    reduce: (state, action) => state.update('actions', actions => actions.set(action.index, fromJS(action.action)))
  })
  .add({
    alias: 'updateDCA',
    create: (phase, property, value) => ({
      type: 'UPDATE_DCA',
      phase, 
      property,
      value
    }),
    reduce: (state, action) => {
      // return state.update('forc', forc => forc.setIn([action.phase, action.property], action.value).set('forcChanged', true))
      return state.update('forc', forc => forc.setIn([action.phase, action.property], action.value)).set('forcChanged', true)
    }
  })
  .add({
    alias: 'updateDeclineType',
    create: (declineType) => ({
      type: 'UPDATE_DECLINE_TYPE',
      declineType
    }),
    reduce: (state, action) => {
      return state.update('forc', forc => forc.set('declineType', action.declineType).set('forcChanged', true))

    }
  })
  .add({
    alias: 'clearForecast',
    create: (phase) => ({
      type: 'CLEAR_FORECAST',
      phase
    }),
    reduce: (state, action) =>
      state.update('forc', forc => forc.set(action.phase, fromJS({
          qi: undefined,
          di: undefined,
          b: undefined,
          years: undefined,
          eur: undefined,
          tStart: ''
        }))
        .set('forcChanged', true)
        .set('userID', undefined)
        .set('date', undefined))

  })
  .add({
    alias: 'updateSelectedRow',
    create: index => {
      return {
        type: 'UPDATE_SELECTED_TABLE_ROW',
        index
      }
    },
    reduce: (state, action) => {
      return state.set('selectedTableRow', action.index)
    }
  })
  .add({
    alias: 'updateQIAndTStart',
    create: (Qi, tStart, phase) => ({
      type: 'UPDATE_QI_AND_TSTART',
      Qi,
      tStart,
      phase
    }),
    reduce: (state, action) => {
      return state.update('forc', forc => forc.
        setIn([action.phase, 'qi'], action.Qi)
        .setIn([action.phase, 'tStart'], action.tStart)
        .set('forcChanged', true)
      )
    }
  })

export default register