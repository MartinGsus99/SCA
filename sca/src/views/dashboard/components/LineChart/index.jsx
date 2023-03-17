import React, { Component } from 'react'
import * as echarts from 'echarts';

class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    chart: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartData !== this.props.pieChartData) {
      this.initChart();
    }
  }

  setOptions() {
    this.state.chart.setOption({
      title: {
        text: this.props.chartTitle
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Java', 'Python', ]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mat', 'Jun', 'Jul', 'Obt', 'Sep', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Java',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 120, 132, 101, 134, 90, 230,]
        },
        {
          name: 'Python',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 120, 132, 101, 134, 90, 230,]
        },

      ]
    })
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.pieChartData);
    });
  }


  render() {
    return (
      <div ref={(el) => (this.el = el)} style={this.props.styles}></div>
    );
  }
}

export default LineChart;