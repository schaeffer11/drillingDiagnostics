import React, { Component } from 'react'
import { Link } from 'react-router'
import autobind from 'autobind-decorator'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import measure from 'remeasure'
import layouts from './../layouts'
import { connect } from 'react-redux'
// import ActionsHelper from './ActionsHelper'
import { automapState, automapActions } from '../../../redux/helpers'
import { wellColumns } from '../../../lib/utils'
import DataTable from './DataTable'
import FileSelector from './FileSelector'
import WellSelector from './WellSelector'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

@autobind class ProductSpace extends Component {
  constructor(props) {
    super(props)

    this.state = {      
      rawData: [],
      wells: [],
      files: [],
      selectedFile: undefined,
      selectedWell: 'Corralillo6890',
      data: []
    }
  }

  getFiles() {
    fetch('/api/get_files')
      .then(r => r.json())
      .then(data => {
        this.setState({
          files: data
        })
      })
  }

  getWells(file) {
    let { selectedWell } = this.state
    let self = this

    let fetchStr = '/api/read_file?file=' + file

    fetch(fetchStr)
      .then(r => r.json())
      .then(data => {
        let wells = []
        for (var i = 0; i < data.length; i++) {
          if (!wells.includes(data[i]['Well Name'])) {
            wells.push(data[i]['Well Name'])
          }
        }


        data = data.map(i => ({
          id: i.ID,
          sideTrackID: 0,
          wellName: i['Well Name'],
          wellType: i.WellType,
          clientDepth2: i['Client DEPTH 2'],
          qriDepth2: i['QRI DEPTH 2'],
          qriDepthRevised: 0,
          clientHoleSize: i['Client Hole Size'],
          qriHoleSize: i['QRI Hole Size'],
          qriHoleSizeRevised: 0,
          operationDate: i['Operation Date'],
          fromDateTime: i['From DateTime'],
          toDateTime: i['To DateTime'],
          dateCheck: i['Date Check'],
          durationDays: i['Duration Days'],
          timeCheck: i['Time Check'],
          footage: i.Footage,
          ropmHr: i['ROP M_hr'],
          dfs: i.DFS,
          description: i['Activity Description'],
          descriptionEnglish: i['Activity Description (English)'],
          clientP_NP: i['Client P_NP'],
          qriP_NPRevised: 0,
          prob: 0,
          clientPhase: i['Client Phase'],
          qriMajorOperation: 0,
          nptCategory: 0,
          nptType: 0
        }))

        self.setState({
          rawData: data,
          wells: wells,
        })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  componentDidMount() {
    this.getFiles()
  }


  handleSelectedWellChange(well) {
    let { rawData } = this.state

    this.setState({
      selectedWell: well,
      data: rawData.filter(i => i.wellName === well)
    })
  }

  handleSelectedFileChange(file) {
    this.getWells(file)

    this.setState({
      selectedFile: file,
      selectedWell: undefined,
      data: [],
      wells: []
    })
  }

  render() {
    let { data, rawData, selectedWell, wells, files, selectedFile} = this.state

    return(
      <div className='ProductSpace' >
        <FileSelector files={files} selectedFile={selectedFile} handleChange={this.handleSelectedFileChange} />
        <WellSelector wells={wells} selectedWell={selectedWell} handleChange={this.handleSelectedWellChange} />
        <DataTable data={data}/>
      </div>
    )
  }
}


export default connect(automapState('theme', 'portfolios', 'user'), automapActions('portfolios'))(ProductSpace)