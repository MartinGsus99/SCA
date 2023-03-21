import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Card, } from 'antd';
import './gauge.less';

class NETGauge extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        networkFlow:0,
    }

    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
            this.setOptions(this.props.networkFlow);
        });
    }


    setOptions(actualData) {
        this.state.chart.setOption({
            series: [{
                min: 0,
                max: 10,
                interval: 1,
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                axisLine: {
                    lineStyle: {
                        width: 18
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 25,
                    color: '#999',
                    fontSize: 15
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                title: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 20,
                    formatter: '{value} Mb/s',
                },
                data: [{
                    value: (actualData/1024).toFixed(2),
                    name: "传输速率"
                },
                ]
            }]
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.networkFlow !== this.props.networkFlow) {
            this.initChart();
        }
    }




    render() {
        return (
            <Card className='card'>
                <div ref={(el) => (this.el = el)} style={this.props.styles}></div>
            </Card>
        );
    }
}

export default NETGauge;