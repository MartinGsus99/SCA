import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Card, } from 'antd';
import './gauge.less';

class NETGauge extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    componentDidMount() {
        var mychart = echarts.init(document.getElementById('net'));

        const gaugeData = [
            {
                value: 20,
                name: '低危',
                title: {
                    offsetCenter: ['0%', '-30%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-20%']
                }
            },
            {
                value: 40,
                name: '重危',
                title: {
                    offsetCenter: ['0%', '0%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '10%']
                }
            },
            {
                value: 60,
                name: '中危',
                title: {
                    offsetCenter: ['0%', '30%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '40%']
                }
            }
        ];

        let option = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#464646'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 40
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: gaugeData,
                    title: {
                        fontSize: 14
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'inherit',
                        borderColor: 'inherit',
                        borderRadius: 20,
                        borderWidth: 1,
                        formatter: '{value}%'
                    }
                }
            ]
        };
        // setInterval(function () {
        //     gaugeData[0].value = +(Math.random() * 100).toFixed(2);
        //     gaugeData[1].value = +(Math.random() * 100).toFixed(2);
        //     gaugeData[2].value = +(Math.random() * 100).toFixed(2);
        //     myChart.setOption({
        //         series: [
        //             {
        //                 data: gaugeData,
        //                 pointer: {
        //                     show: false
        //                 }
        //             }
        //         ]
        //     });
        // }, 2000);

        mychart.setOption(option);
    }

    render() {
        return (
            <Card className='card'>
                <div id='net' className='gauge' ></div>
            </Card>
        );
    }
}

export default NETGauge;