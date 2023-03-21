import React, { Component } from 'react';
import { Col, Row } from 'antd';
import CPUGauge from './components/gaugeChart1';
import RAMGauge from './components/gaugeChart2';
import NETGauge from './components/gaugeChart3';
import DynamicTable from '../../components/DynamicTable';

import { getAdminIndexChart } from '../../api/chart';

import {
    getTask
} from "../../api/task";

class SysBoard extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        CPUGauge: 0,
        ramUsage: 20,
        networkFlow: 100,
        isLoading:false,
        listData:[],
        queryKeys:{},
        uiList:[{
            title:'任务名称',
            dataIndex:'taskName',
            key:'taskName',
        },
        {
            title:'创建时间',
            dataIndex:'gmtCreate',
            key:'gmtCreate',
        },
        {
            title:'检测耗时',
            dataIndex:'cost',
            key:'cost',
        },
        {
            title:'创建人',
            dataIndex:'creator',
            key:'creator'
        }
    ]

    }

    getSysStatusData() {
        getAdminIndexChart().then((res) => {
            if (res.data.success) {
                let data = res.data.data;
                let cpu = data.cpuPercent.used_percent;
                let ram = data.memoryPercent.used_percent;
                let net = data.networkFlow.received_network_flow;
                this.setState({
                    CPUGauge: cpu,
                    ramUsage: ram,
                    networkFlow: net,
                });
            }
        })
    }

    fetchData() {
        //获取数据
        this.isLoading = true;
        let data = this.state.queryKeys
        data.page = 1
        data.rows = 10
        getTask(data).then((res) => {
            console.log(res);
            if (res.data.success) {
                console.log(res.data.data)
                this.setState({
                    isLoading:false,
                    listData:res.data.data,
                })
            }
        });
    }

    componentWillMount() {
        this.getSysStatusData();
        this.fetchData();
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getSysStatusData(), 2000);
    }

    componentWillUnmount() {
        this.time && clearTimeout(this.timer);
    }



    render() {
        return (<div>
            <Row>
                <Col className='gaugeCard' span={8}>
                    <CPUGauge CPUGauge={this.state.CPUGauge} styles={{ width: 550, height: 400 }}></CPUGauge>
                </Col>
                <Col className='gaugeCard' span={8}>
                    <RAMGauge ramUsage={this.state.ramUsage} styles={{ width: 550, height: 400 }}></RAMGauge>
                </Col>
                <Col className='gaugeCard' span={8}>
                    <NETGauge networkFlow={this.state.networkFlow} styles={{ width: 550, height: 400 }}></NETGauge>
                </Col>
            </Row>

            <Row>
                <DynamicTable uiList={this.state.uiList} data={this.state.listData}></DynamicTable>
            </Row>
        </div>);
    }
}

export default SysBoard;