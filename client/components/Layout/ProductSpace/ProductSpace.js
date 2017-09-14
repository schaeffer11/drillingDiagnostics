import React, { Component } from 'react'
import { Link } from 'react-router'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../../redux/helpers'
import { wellColumns } from '../../../lib/utils'
import DataTable from './DataTable'
import FileSelector from './FileSelector'
import WellSelector from './WellSelector'
import AreaGraph from './AreaGraph'
import LineGraph from './LineGraph'

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
          qriDepthRevised: i['QRI DEPTH 2'],
          clientHoleSize: i['Client Hole Size'],
          qriHoleSize: i['QRI Hole Size'],
          qriHoleSizeRevised: i['QRI Hole Size'],
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
          qriP_NPRevised: i['Client P_NP'],
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
    let areaData = []
    let lineData = []

    if (data && data[0]) {

      let noPreSpud = data.filter(i => i.clientHoleSize !== 'pre-spud')

      areaData = noPreSpud.map(i => [parseInt(i.qriHoleSize),parseInt(i.qriDepth2)])
      lineData = noPreSpud.map(i => [parseFloat(i.fromDateTime), parseInt(i.qriDepth2)])

      name = data[0].wellName
    }


    return(
      <div className='ProductSpace' >
        <FileSelector files={files} selectedFile={selectedFile} handleChange={this.handleSelectedFileChange} />
        <WellSelector wells={wells} selectedWell={selectedWell} handleChange={this.handleSelectedWellChange} />
        <AreaGraph data={areaData} name={name} />
        <LineGraph data={lineData} name={name} />
        <DataTable data={data}/>
      </div>
    )
  }
}

export default connect(automapState('theme', 'portfolios', 'user'), automapActions('portfolios'))(ProductSpace)