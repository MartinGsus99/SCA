import React, { useState } from "react";
import { Row, Col } from "antd";
import "./Mycomponents/lineChart.less";
import LineChart from "./Mycomponents/lineChart";
import PointChart from './Mycomponents/pointsMap';

const lineChartDefaultData = {
  "New Visits": {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  Messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  Purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  Shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData["New Visits"]
  );

  const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);

  return (
    <div className="app-container">
      <Row>
        <Col className="col" span={8}>
          <LineChart></LineChart>
        </Col>
        <Col className="col" span={15}>
          <PointChart></PointChart>
        </Col>
    
      </Row>

    </div>
  );
};

export default Dashboard;
