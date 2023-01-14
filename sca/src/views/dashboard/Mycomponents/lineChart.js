import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Card, } from 'antd';
import './lineChart.less';

class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  state = {}

  componentDidMount() {
    var mychart = echarts.init(document.getElementById('lineChart'));

    let option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
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
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    mychart.setOption(option);
  }

  render() {
    return (
      <Card>
        <div id='lineChart' className='lineCharts' ></div>
      </Card>
    );
  }
}

export default LineChart;