import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()


register
  .setInitialState(fromJS({
    filters: [
        {
          name: 'oilRate',
          location: 'meta',
          renderName: 'Oil Rate',
          type: 'range',
          dataType: 'int',
          minMax: [ ],
          value: [ ],
          units: 'STB/D',
          switch: false
        },
        {
          name: 'gasRate',
          location: 'meta',
          renderName: 'Gas Rate',
          type: 'range',
          dataType: 'int',
          minMax: [ ],
          value: [ ],
          units: 'MSCF/D',
          switch: false
        },
        {
          name: 'spudDate',
          location: 'meta',
          renderName: 'Spud Date',
          type: 'range',
          dataType: 'date',
          minMax: [ ],
          value: [ ],
          units: 'Years',
          switch: false
        },
        {
          name: 'cumOil',
          location: 'meta',
          renderName: 'CUM Oil',
          type: 'range',
          dataType: 'int',
          minMax: [ ],
          value: [ ],
          units: 'STB',
          switch: false
        },
        {
          name: 'cumGas',
          location: 'meta',
          renderName: 'CUM Gas',
          type: 'range',
          dataType: 'int',
          minMax: [ ],
          value: [ ],
          units: 'MSCF',
          switch: false
        },
        {
          name: 'status',
          location: 'meta',
          renderName: 'Status',
          type: 'options',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'field',
          location: 'meta',
          renderName: 'Field',
          type: 'options',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'reservoir',
          location: 'meta',
          renderName: 'Reservoir',
          type: 'options',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'operator',
          location: 'meta',
          renderName: 'Operator',
          type: 'options',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'type',
          location: 'meta',
          renderName: 'Type',
          type: 'options',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'eventComments',
          location: 'events',
          renderName: 'Events',
          type: 'comments',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'actionComments',
          location: 'actions',
          renderName: 'Actions',
          type: 'comments',
          dataType: 'string',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'hasEvents',
          location: 'events',
          renderName: 'Has Events',
          type: 'options',
          dataType: 'bool',
          options: [ ],
          value: null,
          switch: false
        },
        {
          name: 'hasForecasts',
          location: 'forc',
          renderName: 'Has Forecasts',
          type: 'options',
          dataType: 'bool',
          options: [ ],
          value: null,
          switch: false
        }
      ],
      queries: {
        filters: {},
        savedForecasts: {}
      },
  }))
  .add({
    alias: 'updateFilterValue',
    create: (filter, property, value) => ({
      type: 'UPDATE_FILTER_VALUE',
      filter,
      property,
      value
    }),
    reduce: (state, action) => {
      return state.setIn(['filters', action.filter, action.property], action.value)
    }
  })
  .add({
    alias: 'updateQuery',
    create: (location, query) => ({
      type: 'UPDATE_FILTER_QUERY',
      location,
      query
    }),
    reduce: (state, action) => {
      return state.setIn(['queries', action.location], fromJS(action.query))
    }
  })
  .add({
    alias: 'resetSwitches',
    create: () => {
      return {
        type: 'RESET_ALL_FILTER_SWITCHES'
      }

    },
    reduce: (state) => state.update('filters', (filters) =>
      filters.map((filter) => {
        return filter.set('switch', false)
      })
    )
  })
  .add({
    alias: 'resetRangeValues',
    create: () => {
      return {
        type: 'RESET_ALL_FILTER_RANGE_VALUES'
      }
      
    }, 
    reduce: (state) => state.update('filters', (filters) => 
       filters.map((filter, index) => {

        switch (filter.get('type')) {
          case 'range':
            return filter.set('value', filter.get('minMax'))
            break;

          case 'options':
            return filter.set('value', null)
          
          case 'comments':
            return filter.set('value', null)
            break
          default:
            break;
        }
        
      })
    )
  })


export default register