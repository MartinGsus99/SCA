import React, { Component } from 'react';
import { Col, Row } from 'antd';
import CPUGauge from './components/gaugeChart1';
import RAMGauge from './components/gaugeChart2';
import NETGauge from './components/gaugeChart3';
import SysTable from './components/table';

class SysBoard extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<div>
            <Row>
                <Col className='gaugeCard' span={8}>
                    <CPUGauge></CPUGauge>
                </Col>
                <Col className='gaugeCard' span={8}>
                    <RAMGauge></RAMGauge>
                </Col>
                <Col className='gaugeCard' span={8}>
                    <NETGauge></NETGauge>
                </Col>
            </Row>

            <Row>
                <SysTable></SysTable>
            </Row>
        </div>);
    }
}

export default SysBoard;