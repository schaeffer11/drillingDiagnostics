import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../../redux/helpers'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { wellColumns, serielToDate, dateToString } from '../../../lib/utils'

const columns = wellColumns

@autobind class DataTable extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let { data } = this.props

    return(
      <div className="table wellData">
        <ReactTable
          data={data}
          columns={columns}
          showPageJump={false}
          showPageSizeOptions={false}
          defaultPageSize={100}
          defaultSorted={[{ id: 'ein', desc: true }]}
          getTrProps={this.onRowClick}
          />
      </div>
    )
  }
}


export default connect(automapState(), automapActions())(DataTable)


