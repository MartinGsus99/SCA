import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Card, } from 'antd';
import './gauge.less';

class CPUGauge extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    componentDidMount() {
        var mychart = echarts.init(document.getElementById('cpu'));

        let option = {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: 'Pressure',
                type: 'gauge',
                detail: {
                  formatter: '{value}'
                },
                data: [
                  {
                    value: 50,
                    name: 'SCORE'
                  }
                ]
              }
            ]
          };
    
        mychart.setOption(option);
    }

    render() {
        return (
            <Card className='card'>
                <div id='cpu' className='gauge' ></div>
            </Card>
        );
    }
}

export default CPUGauge;