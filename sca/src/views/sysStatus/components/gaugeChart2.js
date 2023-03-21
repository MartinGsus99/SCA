import * as echarts from "echarts";
import React, { Component } from "react";
import { Card } from "antd";
import "./gauge.less";

class RAMGauge extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    ramUsage:0,
  };

  
  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.ramUsage);
    });
  }

  setOptions(actualData) {
    this.state.chart.setOption({
        series: [
        {
          type: "gauge",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 10,
          itemStyle: {
            color: "#FFAB91",
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: "#999",
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: "#999",
            },
          },
          axisLabel: {
            distance: -20,
            color: "#999",
            fontSize: 20,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: "60%",
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, "-15%"],
            fontSize: 60,
            fontWeight: "bolder",
            formatter: "{value} %",
            color: "inherit",
          },
          data: [
            {
              value: actualData,
              name: 'RAM'
            },
          ],
        },
        {
          type: "gauge",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          itemStyle: {
            color: "#FD7347",
          },
          progress: {
            show: true,
            width: 8,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: actualData,
            },
          ],
        },
      ]
    })
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.ramUsage !== this.props.ramUsage) {
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

export default RAMGauge;
