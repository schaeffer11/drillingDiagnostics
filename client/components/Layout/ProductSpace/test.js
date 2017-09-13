import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../../redux/helpers'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const columns = [{
  Header: 'Establishments In Need',
  columns: [{
    Header: ' ',
    accessor: 'ein'
  }, {
    Header: 'Size',
    accessor: 'size',
  }, {
    Header: 'Address',
    accessor: 'address',
  }]
}]

@autobind class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [{ein: 'TestNursingHome', size: 'fucking massive, over 9000 people', address: '1123 Street Street'},
             {ein: 'TestNursingHome2', size: 'at least 6', address: '3101 smith st'}]
    }
  }



 onRowClick(state, rowInfo, column, instance) {
      return {
          onClick: e => {
              console.log('A Td Element was clicked!')
              console.log('it produced this event:', e)
              console.log('It was in this column:', column)
              console.log('It was in this row:', rowInfo)
              console.log('It was in this table instance:', instance)
          }
      }
  }

  getData() {
    let {  } = this.props

    let self = this
    let fetchStr = '/api/'


    // fetch(fetchStr)
    //   .then(handleErrors)
    //   .then(r => r.json())
    //   .then(data => {
    //     console.log('ein', fetchStr)

    //     this.setState({
    //       data: [{ein: 'TestNursingHome', size: 'fucking massive, over 9000 people', address: '1123 Street Street'}]
    //     })
    //   })
    //   .catch(err => {
    //     console.warn(err)
    //   })
    console.log('i am here')
  }

  componentWillReceiveProps() {
    this.getData()  
  }

  componentDidMount() {
    // let { } = this.props
    this.getData()
  }


  componentWillMount() {
  }

  render() {
    let { data } = this.state

    return(
      <div className="table ein">
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


export default connect(automapState(), automapActions())(Test)