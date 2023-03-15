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
    pieDatas:[],
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
        this.setState({
          pieDatas:pieData
        })
      }
    })
  }

  componentWillMount() {
    this.getDistributionData();
  }

  componentDidMount(){
    
  }

  render() {

    return (
      <div className="app-container">
        <Row>
          <Col className="col" span={8}>
            <Card>
              <PieChart pieChartData={this.state.pieDatas} chartTitle={'项目语言分布'}></PieChart>
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