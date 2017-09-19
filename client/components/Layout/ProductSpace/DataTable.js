import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../../redux/helpers'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { wellColumns, serielToDate, dateToString } from '../../../lib/utils'
import { render } from "react-dom";
import { LongDate, ShortDate } from '../../../lib/formatters'
import json2csv from 'json2csv'


@autobind class DataTable extends Component {
  constructor(props) {
    super(props)
    this.renderEditable = this.renderEditable.bind(this);
    this.state = {
      data: [],
      changeData: undefined
    }
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#cccccc" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          console.log(cellInfo)
          const changeData = [...this.state.changeData];
          changeData[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ changeData });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.changeData[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  componentWillReceiveProps({ data, changeData, selectedWell }) {

    if (!changeData) {
      changeData = data
    }

    for (var i = 0; i < changeData.length; i++) {
      changeData[i].ID = parseInt(changeData[i].ID)
    }

    this.setState({
      data: data,
      changeData: changeData
    })
  }

    handleCancelClick(e) {
      let { changeData } = this.state
      let { selectedWell } = this.props
      
      if (selectedWell) {
        let fetchStr = '/api/read_change_file?file=' + selectedWell +'.csv'
        fetch(fetchStr)
          .then(r => r.json())
          .then(data => {
            this.setState({
              changeData: data,
            })
          })
      }
    }

    handleSaveClick(e) {
      let { changeData } = this.state
      let { selectedWell } = this.props

      if (changeData && changeData.length) {
        let fields = []
        for (var field in changeData[0]) {
          fields.push(field)
        }

        let csv = json2csv({fields: fields, data: changeData.slice(1)})
        let fetchStr = '/api/write_change_file?well=' + selectedWell

        fetch(fetchStr, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
          body:  JSON.stringify({ data: csv })
        })
      }
    }

    handleSubmitClick(e) {
      let { changeData } = this.state
      let { selectedWell } = this.props

      if (changeData && changeData.length) {
        let fields = []
        for (var field in changeData[0]) {
          fields.push(field)
        }

        let csv = json2csv({fields: fields, data: changeData.slice(1)})
        let fetchStr = '/api/write_submit_file?well=' + selectedWell

        fetch(fetchStr, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
          body:  JSON.stringify({ data: csv })
        })
      }
    }

  render() {
    let { data, changeData } = this.state

    return(
      <div >
        <button type='button' className='cancel-button' onClick={this.handleCancelClick} > Cancel </button>
        <button type='button' className='save-button' onClick={this.handleSaveClick} > Save </button>
        <button type='button' className='submit-button' onClick={this.handleSubmitClick} > Submit for Training </button>
        <div className="table wellData">
          <ReactTable
            data={changeData}
            columns={[{
            Header: 'ID',
            accessor: 'ID',
            Width: 175,
          }, {
            Header: 'SideTrackID',
            accessor: 'SideTrackID',
            Width: 175,
            sortable: false
          }, {
            Header: 'WellName',
            accessor: 'WellName',
            Width: 175,
            sortable: false
          }, {
            Header: 'WellType',
            accessor: 'WellType',
            Width: 175,
            sortable: false
          }, {
            Header: 'ClientDepth2',
            accessor: 'ClientDEPTH2',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIDepth2',
            accessor: 'QRIDEPTH2',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIDepthRevised',
            accessor: 'QRIDepthRevised',
            Width: 175,
            sortable: false,
            Cell: this.renderEditable
          }, {
            Header: 'ClientHoleSize',
            accessor: 'ClientHoleSize',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIHoleSize',
            accessor: 'QRIHoleSize',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIHoleSizeRevised',
            accessor: 'QRIHoleSizeRevised',
            Width: 175,
            sortable: false,
            Cell: this.renderEditable
          }, {
            Header: 'OperationDate',
            accessor: 'OperationDate',
            Width: 175,
            sortable: false,
            Cell: ShortDate
          }, {
            Header: 'FromDateTime',
            accessor: 'FromDateTime',
            Width: 175,
            sortable: false,
            Cell: LongDate
          }, {
            Header: 'ToDateTime',
            accessor: 'ToDateTime',
            Width: 175,
            sortable: false,
            Cell: LongDate
          }, {
            Header: 'DateCheck',
            accessor: 'DateCheck',
            Width: 175,
            sortable: false
          }, {
            Header: 'DurationDays',
            accessor: 'DurationDays',
            Width: 175,
            sortable: false,
          }, {
            Header: 'TimeCheck',
            accessor: 'TimeCheck',
            Width: 175,
            sortable: false
          }, {
            Header: 'Footage',
            accessor: 'Footage',
            Width: 175,
            sortable: false
          }, {
            Header: 'ROPM_hr',
            accessor: 'ROPM_hr',
            Width: 175,
            sortable: false
          }, {
            Header: 'DFS',
            accessor: 'DFS',
            Width: 175,
            sortable: false
          }, {
            Header: 'ActivityDescription',
            accessor: 'ActivityDescription',
            Width: 175,
            sortable: false
          }, {
            Header: 'ActivityDescriptionEnglish',
            accessor: 'descriptionEnglish',
            Width: 175,
            sortable: false
          }, {
            Header: 'ClientP_NP',
            accessor: 'ClientP_NP',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIRevisedP_NP',
            accessor: 'QRIRevisedP_NP',
            Width: 175,
            sortable: false,
            Cell: this.renderEditable
          }, {
            Header: 'Probability',
            accessor: 'Probability',
            Width: 175,
            sortable: false
          }, {
            Header: 'ClientPhase',
            accessor: 'ClientPhase',
            Width: 175,
            sortable: false
          }, {
            Header: 'QRIMajorOperation',
            accessor: 'QRIMajorOperation',
            Width: 175,
            sortable: false
          }, {
            Header: 'NPTCategory',
            accessor: 'NPTCategory',
            Width: 175,
            sortable: false
          }, {
            Header: 'NPTType',
            accessor: 'NPTType',
            Width: 175,
            sortable: false
          }]
          }
            showPageJump={false}
            style={{
              height: "400px" 
            }}
            showPageSizeOptions={false}
            defaultPageSize={100}
            defaultSorted={[{ id: 'ein', desc: false }]}
            getTrProps={this.onRowClick}
            />
        </div>
      </div>
    )
  }
}


export default connect(automapState(), automapActions())(DataTable)


