import React, { Component } from 'react';
import * as echarts from 'echarts';
class PieChart extends Component {
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

  setOptions(actualData) {
    this.state.chart.setOption({
      title: {
        text: this.props.chartTitle,
        subtext: this.props.subTitle,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: actualData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.pieChartData);
    });
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
 
    this.setState({ chart: null });
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    return (
      <div ref={(el) => (this.el = el)} style={this.props.styles }></div>
    );
  }
}

export default PieChart;