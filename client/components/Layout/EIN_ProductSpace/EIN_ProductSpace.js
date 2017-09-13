import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import measure from 'remeasure'
import layouts from './../layouts'
import { connect } from 'react-redux'
import { automapState, automapActions } from '../../../redux/helpers'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

@measure
@autobind class EIN_ProductSpace extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    
  }
  render() {
    return(
      <div>
        <ResponsiveReactGridLayout className="layout" 
                          layouts={layouts} 
                          rowHeight={this.props.size.height} 
                          breakpoints={{lg: 1300, md: 850, sm: 0}}
                          cols={{lg: 100, md: 100, sm: 100}} 
                          width={window.innerWidth}>
            <div style={{height: '100%'}} key="analysis">
              <h1>This is the main site for EINs</h1>
            </div>
          </ResponsiveReactGridLayout>
      </div>
    )

  }
}


export default connect(automapState('user', 'app'), automapActions('user', 'app'))(EIN_ProductSpace)