import React, { Component } from 'react';
import * as echarts from 'echarts';
import './index.less';

class PieChart extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pieOption:{},
  }



  componentDidMount() {
    var chartDom = document.getElementById('pieChart');
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.state.pieOption);
  }
  render() {
    const { pieChartData } = this.props;
    
    return (
      <div id="pieChart" className={'pieChart'}>

      </div>
    );
  }
}

export default PieChart;