import React, { Component } from 'react'
import DynamicTable from '@/components/DynamicTable'
import Filter from '@/components/Filter'
import { getCPELoophole } from '@/api/knowledge'
import { Card, Modal, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker

const { Option } = Select


class CWETable extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        queryKeys: {
            type: '1',
            kind: '0',
            cpeId: '',
            start_date: '',
            end_date: '',
        },
        listCPEQuery: {
            current: 10,
            pageSize: 10, // 每页显示的条数
            total: 0, // 数据总数
        },
        data: [],

        queryList: [
            {
                id: 1,
                label: 'CPE编号',
                name: 'cpeId',
                placeholder: 'CPE编号',
                component: <Input style={{ width: '180px' }} placeholder="请输入CPE编号" />,
            },
            {
                id: 2,
                label: '检索类型',
                name: 'type',
                placeholder: '检索类型',
                type: 'select',
                component: <Select style={{ width: '180px' }} placeholder="请选择检索类型" >
                    <Option value="1">收录时间</Option>
                    <Option value="0">更新时间</Option>
                </Select>,
            },

            {
                id: 3,
                label: '时间范围',
                name: 'timerange',
                placeholder: '请选择时间范围',
                component: <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={this.onChange}
                />,
            }
        ],

        cpeUIData: [
            {
                dataIndex: 'cpeId',
                title: 'CPE编号',
            }, {
                dataIndex: 'cpeName',
                title: '攻击向量',
            },
            {
                dataIndex: 'product',
                title: '应用程序',
            },
            {
                dataIndex: 'gmtCreated',
                title: '收录时间',
            },
            {
                dataIndex: 'gmtModified',
                title: '更新时间',
            },
            {
                dataIndex: 'version',
                title: '版本',
            }
        ],
    }

    getCPETableData () {
        let data = this.state.queryKeys
        data.page = this.state.listCPEQuery.current
        data.rows = this.state.listCPEQuery.pageSize
        console.log(data)
        getCPELoophole(data).then((res) => {
            console.log(res.data)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                data: res.data.data,
                listCPEQuery: pageData,
            })
        })
    }
    handleSearch = values => {
        console.log(values)
    }
    onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1])
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }


    componentDidMount () {
        this.getCPETableData()
    }

    render () {
        return (
            <div>
                <Card>
                    <Filter formItems={this.state.queryList} onSearch={this.handleSearch}></Filter>
                </Card>
                <Card>
                    <DynamicTable uiList={this.state.cpeUIData} data={this.state.data} pageData={this.state.listCPEQuery} ></DynamicTable>
                </Card>
            </div>
        )
    }
}

export default CWETable