// imports
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import ReactHighCharts from 'react-highcharts'


const config = {
        chart: {
          type: 'area'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Depth vs. Hole Size'
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '',
            formatter: function() {
              return 'Hole Size: ' + (Math.abs(this.x) * 2) + '<br/>Depth: ' + (-1 * this.y);
            }
        },
        xAxis: {
            title: {
              text: 'Hole Size (M)'
            },
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return Math.abs(this.value) * 2;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Depth (M)'
            },
            labels: {
                formatter: function () {
                    return -1 * this.value;
                }
            }
        },
        credits: {
          enabled: false
        },
        series: [{
          showInLegend: false, 
          data:  []
        }]
      }

@autobind class AreaGraph extends Component {
  constructor(props) {
    super(props)

  }

  componentWillReceiveProps({ data, name }) {
    let chart = this.chart
    if (data[0]) {
      let sortedData = data.sort(function(a,b) {
        return b[0] - a[0]
      })

      let groupedBySort = []
      let sortRow = []
      let cur = 0
      for (var i = 0; i < sortedData.length; i++) {
        if (sortedData[i][0] == cur) {
          sortRow.push(sortedData[i])
        }
        else {
          cur = sortedData[i][0]
          groupedBySort.push(sortRow)
          sortRow = []
        }
      }
      groupedBySort.push(sortRow)

      for (var i = 0; i < groupedBySort.length; i++)
        groupedBySort[i] = groupedBySort[i].sort(function(a,b) {
          return a[1] - b[1]
        })


      let doubleSort = groupedBySort.reduce(function(a, b) {
        return a.concat(b)
      })


      let graphData = doubleSort.map(i => [-1 * (i[0] / 2), (-1 * i[1])]).concat(doubleSort.map(i => [i[0] / 2, (-1 * i[1])]).reverse())
      let series = this.chart.getChart().series[0]
      series.setData(graphData)

      config.title.text = name
    }
    else {
      let series = this.chart.getChart().series[0]
      series.setData([])
    }
  }

  render() { 

    return (
      <div className="chart area-graph">
        <ReactHighCharts className="chart" ref={(ref) => this.chart = ref} config = {config} />
      </div>
    )
  }
}

export default AreaGraph



