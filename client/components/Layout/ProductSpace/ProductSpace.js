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
      selectedChangeFile: undefined,
      selectedWell: undefined,
      data: [],
      changeData: undefined
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
    let { selectedWell, files } = this.state
    let self = this
    console.log(files)
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
          ID: parseInt(i.ID),
          SideTrackID: 0,
          WellName: i['Well Name'],
          WellType: i.WellType,
          ClientDEPTH2: i['Client DEPTH 2'],
          QRIDEPTH2: i['QRI DEPTH 2'],
          QRIDepthRevised: i['QRI DEPTH 2'],
          ClientHoleSize: i['Client Hole Size'],
          QRIHoleSize: i['QRI Hole Size'],
          QRIHoleSizeRevised: i['QRI Hole Size'],
          OperationDate: i['Operation Date'],
          FromDateTime: i['From DateTime'],
          ToDateTime: i['To DateTime'],
          DateCheck: i['Date Check'],
          DurationDays: i['Duration Days'],
          TimeCheck: i['Time Check'],
          Footage: i.Footage,
          ROPM_hr: i['ROP M_hr'],
          DFS: i.DFS,
          ActivityDescription: i['Activity Description'],
          descriptionEnglish: i['Activity Description (English)'],
          ClientP_NP: i['Client P_NP'],
          QRIRevisedP_NP: i['Client P_NP'],
          Probability: 0,
          ClientPhase: i['Client Phase'],
          QRIMajorOperation: 0,
          NPTCategory: 0,
          NPTType: 0
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
    let fetchStr = '/api/get_change_files'

    fetch(fetchStr)
      .then(r => r.json())
      .then(data => {
        data.forEach(i => {
          let change = 0
          if (i.slice(0, -4) === well) {
            change = 1
            fetchStr = '/api/read_change_file?file=' + i
            fetch(fetchStr)
              .then(r => r.json())
              .then(data => {
                this.setState({
                  changeData: data,
                  selectedChangeFile: i
                })
              })
          }
          if (change === 0) {
            this.setState({
              changeData: undefined,

            })
          }
        })
      })

    this.setState({
      selectedWell: well,
      data: rawData.filter(i => i.WellName === well)
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
    let { data, rawData, selectedWell, wells, files, selectedFile, changeData, selectedChangeFile} = this.state
    let areaData = []
    let lineData = []
    console.log(data, changeData, selectedChangeFile)

    if (data && data[0]) {
      let noPreSpud = data.filter(i => i.ClientHoleSize !== 'pre-spud')

      areaData = noPreSpud.map(i => [parseInt(i.QRIHoleSize),parseInt(i.QRIDEPTH2)])
      lineData = noPreSpud.map(i => [parseFloat(i.FromDateTime), parseInt(i.QRIDEPTH2)])

      name = data[0].WellName
    }



    return(
      <div className='ProductSpace' >
        <FileSelector files={files} selectedFile={selectedFile} handleChange={this.handleSelectedFileChange} />
        <WellSelector wells={wells} selectedWell={selectedWell} handleChange={this.handleSelectedWellChange} />
        <AreaGraph data={areaData} name={name} />
        <LineGraph data={lineData} name={name} />
        <DataTable data={data} changeData={changeData} selectedChangeFile={selectedChangeFile} />
      </div>
    )
  }
}

export default connect(automapState('theme', 'portfolios', 'user'), automapActions('portfolios'))(ProductSpace)