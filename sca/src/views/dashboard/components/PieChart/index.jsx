import React, { Component } from 'react';
import * as echarts from 'echarts';
import './index.less';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    pieTitle: '',
    pieData: [],
    pieChartOption : {
      title: {
        text: '',
        subtext: 'Language Distribution',
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
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
    }
  }

  initChart(){
    var chartDom = document.getElementById('pieChart');
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.state.pieChartOption);
  }

  refreshChart(){
    let chartDom=this.myRef.current;
    const pieChartData = this.props.pieChartData;
    const title=this.props.chartTitle;
    this.setState({
      pieTitle:title,
      pieData:pieChartData,
    });
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.state.pieChartOption);
  };

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(){
    this.refreshChart();
  }

  render() {
    return (
      <div ref={this.myRef} id="pieChart" className={'pieChart'}>

      </div>
    );
  }
}

export default PieChart;