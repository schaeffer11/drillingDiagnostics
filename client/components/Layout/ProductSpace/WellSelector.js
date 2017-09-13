// imports
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import VirtualizedSelect from 'react-virtualized-select'

@autobind class WellSelector extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let { wells, selectedWell, handleChange} = this.props

    return (
      <VirtualizedSelect
        className="well"
        placeholder="Select a Well"
        simpleValue={true}
        value={selectedWell}
        options={wells.map(i => ({ label:i, value:i }))}
        onChange={handleChange}
        clearable = {false}
      />
    )
  }
}

export default WellSelector
