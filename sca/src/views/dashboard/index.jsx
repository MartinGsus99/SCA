import React, { Component } from 'react';
import { Row, Col, Card } from "antd";
import "./Mycomponents/lineChart.less";
import PieChart from './components/PieChart/'
import PointChart from './Mycomponents/pointsMap';
import { getIndexChart, getAdminIndexChart } from '../../api/chart';


class DashBoard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    lineChartData: {},
    pieChartData: {
      title: {
        text: '项目语言分布',
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
    },
  }

  getDistributionData() {
    getIndexChart().then((res) => {
      if (res.data.success) {
        let distributionData = res.data.data.distribution;
        let oriData = Object.entries(distributionData);
        let pieData = []
        oriData.map((item) => {
          let temp = {}
          temp.name = item[0];
          temp.value = item[1].number;
          pieData.push(temp);
        })
        this.state.pieChartData.series[0].data=pieData;
        console.log(this.state.pieChartData);
      }
    })
  }

  componentWillMount() {
   
  }

  componentDidMount(){
    this.getDistributionData();
  }

  render() {
    return (
      <div className="app-container">
        <Row>
          <Col className="col" span={8}>
            <Card>
              <PieChart pieChartData={this.state.pieChartData}></PieChart>
            </Card>
          </Col>
          <Col className="col" span={15}>

          </Col>

        </Row>

      </div>
    );
  }
}

export default DashBoard;