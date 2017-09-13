import ReduxRegistry from 'redux-registry'
import { List, Map, fromJS } from 'immutable'

let register = new ReduxRegistry()

register
  .setInitialState(fromJS({
    wellList: {
      headers: [
        { label: 'Name', id: 'name', display: true },
        { label: 'Reservoir', id: 'reservoir', display: true },
        { label: 'ID', id: 'uniqueID', display: false },
        { label: 'Type', id: 'type', display: false },
        { label: 'Oil Rate', id: 'oilRate', display: false },
        { label: 'Status', id: 'status', display: true },
        { label: 'Oil Initial Decline Rate', id: 'oilInitialDeclineRate', display: false },
        { label: 'Oil Current Decline Rate', id: 'oilCurrentDeclineRate', display: false },
        { label: 'Gas Initial Decline Rate', id: 'gasInitialDeclineRate', display: false },
        { label: 'Gas Current Decline Rate', id: 'gasCurrentDeclineRate', display: false}
      ],
      data: []
    },
    selectedTableColumns: [{ value: 0, label: 'Name' }, { value: 1, label: 'Reservoir' }, { value: 5, label: 'Status' }],
    wellLoadProg: 0,
    queryModalActive: false
  }))
  .add({
    alias: 'updateWellList',
    create: (wellList, progress, total) => {
      return {
        type: 'UPDATE_WELL_LIST',
        wellList,
        progress,
        total
      }
    },
    reduce: (state, action) => {
      return state.setIn(['wellList', 'data'], fromJS(action.wellList)).set('wellLoadProg', Math.ceil((action.progress / action.total) * 100))
    }
  })
  .add({
      alias: 'updateQueryModal',
      create: (value) => ({
        type: 'UPDATE_QUERY_MODAL',
        value
      }),
      reduce: (state, action) => {
        return state.set('queryModalActive', action.value)
      }
    })
.add({
    alias: 'updateHeaders',
    create: (index, headers) => ({
      type: 'UPDATE_HEADERS',
      index,
      headers
    }),
    reduce: (state, action) => {
      return state.setIn(['wellList', 'headers', action.index, 'display'], action.headers)
    }
  })
  .add({
    alias: 'updateSelectedColumns',
    create: columns => {
      return {
        type: 'UPDATE_SELECTED_COLUMNS',
        columns
      }
    },
    reduce: (state, action) => {
      return state.set('selectedTableColumns', fromJS(action.columns))
    }
  })
  .add({
    alias: 'updateData',
    create: (index, data) => {
      return {
        type: 'UPDATE_WELL_LIST_DATA',
        index,
        data
      }
    },
    reduce: (state, action) => {
      return state.setIn(['wellList', 'data', action.index], fromJS(action.data))
    }
  })

export default register
