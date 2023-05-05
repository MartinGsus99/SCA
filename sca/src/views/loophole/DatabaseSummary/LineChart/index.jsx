import React, { Component } from 'react'
import * as echarts from 'echarts'

class LineChart extends Component {
  constructor(props) {
    super(props)
  }
  state = {

  }

  setOptions (actualData) {
    console.log('actual', actualData)
    this.state.chart.setOption({
      title: {
        text: "漏洞数据库近30日数据更新",
        textStyle: {
          color: "#7C83F3",
          fontStyle: "normal",
        },
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>日期:{b}<br/>数量:{c}个",
        backgroundColor: "#191250",
        textStyle: {
          color: "#fff",
        },
        extraCssText: "border-radius:10px",
      },
      xAxis: {
        type: "category",
        data: actualData.dateData,
        axisLabel: {
          formatter: "{value}日",
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} 个",
        },
      },
      legend: {
        bottom: 10,
        left: "center",
        data: ["CVE更新", "CPE更新"],
      },
      series: [{
        name: "CVE更新",
        data: actualData.cveData,
        type: "line",
        lineStyle: {
          color: "#7C83F3",
          witdth: 3,
        },
        emphasis: {
          disabled: false,
          scale: 3,
          focus: "self",
          blurScope: "global",
        },
      },
      {
        name: "CPE更新",
        data: actualData.cpeData,
        type: "line",
        lineStyle: {
          witdth: 3,
        },
        emphasis: {
          disabled: false,
          scale: 3,
          focus: "self",
          blurScope: "global",
        },
      },
      ],
    })
  }

  initChart () {
    if (!this.el) return
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.lineChartData)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.chartData !== this.props.lineChartData) {
      this.initChart()
    } else {
      this.initChart()
    }
  }

  render () {
    return (
      <div ref={(el) => (this.el = el)} style={this.props.styles}></div>
    )
  }
}

export default LineChart