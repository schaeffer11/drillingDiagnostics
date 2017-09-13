// imports
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import VirtualizedSelect from 'react-virtualized-select'

@autobind class FileSelector extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let { files, selectedFile, handleChange} = this.props

    return (
      <VirtualizedSelect
        className="file"
        placeholder="Select a File"
        simpleValue={true}
        value={selectedFile}
        options={files.map(i => ({ label:i.slice(0, -4), value:i }))}
        onChange={handleChange}
        clearable = {false}
      />
    )
  }
}

export default FileSelector
