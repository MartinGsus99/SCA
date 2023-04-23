import React, { Component, useState } from 'react'
import DynamicFilter from '@/components/Filter'
import { Card, DatePicker } from 'antd'
import DynamicTable from '@/components/DynamicTable'
import moment from 'moment'
import {
    getLogData
} from '../../../api/log'
const { RangePicker } = DatePicker

function Log (props) {
    const [queryKeys] = useState({
        dateRange: '',
    })


    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1])
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
    const queryRules = [{
        id: '1',
        name: 'dateRange',
        label: '日期范围',
        placeholder: '请选择时间范围',
        component: <RangePicker
            ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
        />,
    }]



    const [listQuery, setListQuery] = useState({
        current: 1,
        pageSize: 10, // 每页显示的条数
        total: 0, // 数据总数
    })

    const uiList = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'IP',
            dataIndex: 'requestAddr',
            key: 'requestAddr'
        },

        {
            title: '时间',
            dataIndex: 'gmtCreate',
            key: 'gmtCreate',
        },
        {
            title: '模块',
            dataIndex: 'modelName',
            key: 'modelName'
        },
        {
            title: 'URL',
            dataIndex: 'requestUrl',
            key: 'requestUrl'
        },

    ]
    const [listData, setListData] = useState([])

    const fetchData = () => {
        console.log("get data")
        let data = this.state.queryKeys
        data.page = this.state.listQuery.current
        data.rows = this.state.listQuery.pageSize
        getLogData(data).then((res) => {
            const result = res.data.data
            console.log('res', result)
            const pageData = {
                total: res.data.total,
                pageSize: res.data.page,
            }
            this.setState({
                listData: result,
                listQuery: pageData,
            })
        })
    }

    const handleSearch = values => {
        console.log(values)
    }
    return (
        <div>
            <Card><DynamicFilter formItems={queryRules} onSearch={handleSearch}></DynamicFilter></Card>
            <Card>
                <DynamicTable uiList={uiList} data={listData} pageData={listQuery} pagination={listQuery}></DynamicTable>
            </Card>
        </div>
    )
}

export default Log