// imports
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import ReactHighCharts from 'react-highcharts'



const config = {
        chart: {
          type: 'scatter'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Depth vs. Time'
        },
        plotOptions: {
            scatter: {
              lineWidth: 2
            },
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
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
              return 'Date: ' + this.x + '<br/>Depth: ' + (-1 * this.y);
            }
        },
        xAxis: {
            title: {
              text: 'Date'
            },
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
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

@autobind class LineGraph extends Component {
  constructor(props) {
    super(props)

  }

  componentWillReceiveProps({ data, name, testData }) {
    let chart = this.chart
    let series = this.chart.getChart().series[0]

    if (data[0]) {
      data = data.map(i => [i[0], -1 * i[1]])
      console.log(data)
      series.setData(data) 

      config.title.text = name
    }
    else {
      series.setData([])
    }
  }

  render() { 

    return (
      <div className="chart line-graph">
        <ReactHighCharts className="chart" ref={(ref) => this.chart = ref} config = {config} />
      </div>
    )
  }
}

export default LineGraph



