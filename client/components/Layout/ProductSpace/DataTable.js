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
          console.log(e)
          console.log(cellInfo)
          const changeData = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  componentWillReceiveProps({ data, changeData }) {

    if (data.length) {
      let fields = []
      for (var field in data[0]) {
        fields.push(field)
      }

      let csv = json2csv({fields: fields, data: data.slice(1)})
      console.log(csv)
      let encodedUri = encodeURI(csv)
      let link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "my_data.csv")
      document.body.appendChild(link)
      link.click()
    }



    this.setState({
      data: data,
      changeData: changeData
    })
  }


  render() {
    let { data, changeData } = this.state



    console.log(changeData)
    if (changeData) {
      data = changeData
    }


    return(
      <div className="table wellData">
        <ReactTable
          data={data}
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
          defaultSorted={[{ id: 'ein', desc: true }]}
          getTrProps={this.onRowClick}
          />
      </div>
    )
  }
}


export default connect(automapState(), automapActions())(DataTable)


