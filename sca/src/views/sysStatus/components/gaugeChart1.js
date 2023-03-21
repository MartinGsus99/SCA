import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Card, } from 'antd';
import './gauge.less';

class CPUGauge extends Component {
  constructor(props) {
    super(props);
  }
  state = {}

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.CPUGauge);
    });
  }


  setOptions(actualData) {
    this.state.chart.setOption({
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [
            {
              value: actualData,
              name: 'CPU'
            }
          ]
        }
      ]
    })
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.CPUGauge !== this.props.CPUGauge) {
      this.initChart();
    }
  }

  render() {
    return (
      <Card className='card'>
        <div ref={(el) => (this.el = el)} style={this.props.styles }></div>
      </Card>
    );
  }
}

export default CPUGauge;


