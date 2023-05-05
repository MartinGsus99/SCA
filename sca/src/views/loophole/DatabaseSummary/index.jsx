import { func } from 'prop-types'
import React, { Component, useState, useEffect } from 'react'
import { Statistic, Card, Row, Col, Icon } from 'antd'

import {
  getDatabarInfor,
  get30DaysUpdateInfor
} from "@/api/knowledge"

import LineChart from './LineChart'

function DatabaseSummary () {

  const [cveIncre, setCveIncre] = useState(0)
  const [cpeIncre, setCpeIncre] = useState(0)
  const [cweIncre, setCweIncre] = useState(0)

  const lineChartStyle = {
    height: '600px',
    width: '100%',
    background: '#ffffff',
    padding: '30px'
  }

  const getIncreInfor = () => {
    getDatabarInfor().then((res) => {
      if (res.data.success) {
        let data = res.data.data
        setCveIncre(data.numCve)
        setCpeIncre(data.numCpe)
        setCweIncre(data.numCwe)
      }
    })
  }

  const [lineChartData, setLineChartData] = useState([])

  const getLineChartData = () => {
    get30DaysUpdateInfor().then((res) => {
      if (res.data.success) {
        let data = res.data.data
        let cpe = data.cpe
        let cve = data.cve
        let dateData = []
        let cpeData = []
        let cveData = []
        cpe.forEach((item) => {
          let date = item.date
          date = date.split(" ")[0]
          dateData.push(date)
          cpeData.push(item.value)
        })
        cve.forEach((item) => {
          cveData.push(item.value)
        })
        let lineChartData = {
          dateData: dateData,
          cpeData: cpeData,
          cveData: cveData
        }
        setLineChartData(lineChartData)
      }
    })
  }

  useEffect(() => {
    getIncreInfor()
    getLineChartData()
  }, [])


  return (
    <div style={{ background: '#ffffff', padding: '30px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="CVE数量"
              value={cveIncre}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-up" />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="CPE数量"
              value={cpeIncre}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-up" />}
              suffix="个"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="CWE数量"
              value={cweIncre}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-up" />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="在线用户" value={112893} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <LineChart styles={lineChartStyle} lineChartData={lineChartData}></LineChart>
      </Row>
    </div>
  )
}

export default DatabaseSummary

