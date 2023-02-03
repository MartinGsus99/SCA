import * as echarts from "echarts";
import React, { Component } from "react";
import { Card } from "antd";
import "./gauge.less";

class RAMGauge extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  componentDidMount() {
    var mychart = echarts.init(document.getElementById("ram"));

    var option = {
      series: [
        {
          type: "gauge",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
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
              value: 20,
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
          max: 60,
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
              value: 20,
            },
          ],
        },
      ],
    };

    // setInterval(function () {
    //   const random = +(Math.random() * 60).toFixed(2);
    //   myChart.setOption({
    //     series: [
    //       {
    //         data: [
    //           {
    //             value: random,
    //           },
    //         ],
    //       },
    //       {
    //         data: [
    //           {
    //             value: random,
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // }, 2000);

    mychart.setOption(option);
  }

  render() {
    return (
      <Card className="card">
        <div id="ram" className="gauge"></div>
      </Card>
    );
  }
}

export default RAMGauge;
