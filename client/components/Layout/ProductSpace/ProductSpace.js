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
import Test from './test'


@autobind class ProductSpace extends Component {
  constructor(props) {
    super(props)
  }


  componentWillMount() {
  }

  render() {
    return(
      <Test />
    )
  }
}


export default connect(automapState('theme', 'portfolios', 'user'), automapActions('portfolios'))(ProductSpace)