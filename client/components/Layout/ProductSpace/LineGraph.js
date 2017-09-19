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
            series: {
              marker: {
                lineColor: '#000000',
                lineWidth: 1
              }
            },
            scatter: {
              lineWidth: 1
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
          lineColor: '#000000',
          showInLegend: false, 
          data:  []
        }]
      }

@autobind class LineGraph extends Component {
  constructor(props) {
    super(props)

  }

  componentWillReceiveProps({ data, name, colorData }) {
    let chart = this.chart
    let series = this.chart.getChart().series[0]
    let color = undefined

    if (data[0]) {
      data = data.map((i, index) => {

        if (colorData[index].ClientP_NP === 'Productive') {
          color = '#158115'
        }
        else {
          color = '#bf0404'
        }
        return ({x: i[0], y: -1 * i[1], color: color})
      })
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



