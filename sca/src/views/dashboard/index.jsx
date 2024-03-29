import React, { Component } from 'react'
import { Row, Col, Card } from "antd"
import PieChart from './components/PieChart/'
import LineChart from './components/LineChart'
import { getIndexChart, getAdminIndexChart } from '../../api/chart'


class DashBoard extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    lineChartDatas: [],
    pieDatas: [],
    age: 0,
  }

  getDistributionData () {
    getIndexChart().then((res) => {
      if (res.data.success) {
        let distributionData = res.data.data.distribution
        let oriData = Object.entries(distributionData)
        let pieData = [...this.state.pieDatas]
        oriData.map((item) => {
          let temp = {}
          temp.name = item[0].toUpperCase()
          temp.value = item[1].number
          pieData.push(temp)
        })
        console.log('piedata', pieData)
        this.setState({
          pieDatas: pieData,
          lineChartDatas: [],
        })
      }
    }).catch((err) => {
      console.log('error', err)
    })
  }

  getLineChartData () {
    getAdminIndexChart().thne((res) => {
      if (res.data.success) {

      }
    })
  }

  componentWillMount () {
    this.getDistributionData()
  }

  render () {
    return (
      <div className="app-container">
        <Row>
          <Col className="col" span={8}>
            <Card>
              <PieChart pieChartData={this.state.pieDatas} chartTitle={'项目语言分布'} subTitle={'Distribution of Language'} styles={{ width: 500, height: 400 }}></PieChart>
            </Card>

          </Col>
          <Col className="col" span={15}>
            <Card>
              <LineChart pieChartData={this.state.lineChartDatas} chartTitle={'2023年检测分布'} subTitle={'Distribution of Language'} styles={{ width: 1100, height: 400 }}></LineChart>
            </Card>
          </Col>

        </Row>

      </div>
    )
  }
}

export default DashBoard